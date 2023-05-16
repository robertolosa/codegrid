// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

// Track the mouse position
let mousepos = {x: winsize.width/2, y: winsize.height/2};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

const menu = document.querySelector('.menu');
const menuItemsEven = document.querySelectorAll(".menu__item:nth-child(even)");
const menuItemsOdd = document.querySelectorAll(".menu__item:nth-child(odd)");
let menuItemBoundaries;
const circle = document.querySelector('.circle');
const circleBoundaries = {x: -300, y: -300};
// amounts to move/rotate in each axis
let transformVals = {tx: 0, ty: 0, r: 0};
let requestId;

// show circle when hovering on the menu
menu.addEventListener('mouseenter', () => showCircle());
menu.addEventListener('mouseleave', () => hideCircle());

gsap.set(circle, {opacity: 0});

onMouseMove(circle, circleBoundaries)

menuItemsEven.forEach(item => {
    menuItemBoundaries = {x: gsap.utils.random(-10,10), y: gsap.utils.random(-15,15), r: gsap.utils.random(-2,2)};
    onMouseMove(item, menuItemBoundaries)
})

menuItemsOdd.forEach(item => {
    menuItemBoundaries = {x: gsap.utils.random(-10,10), y: gsap.utils.random(-15,15), r: gsap.utils.random(-2,2)};
    onMouseMove(item, menuItemBoundaries)
})

function showCircle() {
    gsap.to(circle, {duration: 0.8, opacity: 1});
}

function hideCircle() {
    gsap.to(circle, {duration: 0.8, opacity: 0});
}

function onMouseMove(element, boundaries) {
    requestId = undefined;

    // calculate the amount to move/rotate.
    // using linear interpolation to smooth things out. 
    // translation values will be in the range of [-boundaries.x, boundaries.x] for a cursor movement from 0 to the window's width. Also the same applies for the height and rotation
    transformVals.tx = lerp(transformVals.tx, map(mousepos.x, 0, winsize.width, -boundaries.x, boundaries.x), 0.07);
    transformVals.ty = lerp(transformVals.ty, map(mousepos.y, 0, winsize.height, -boundaries.y, boundaries.y), 0.07);
    transformVals.r = lerp(transformVals.r, map(mousepos.x, 0, winsize.width, -boundaries.r||0, boundaries.r||0), 0.07);
    
    gsap.set(element, {x: transformVals.tx, y: transformVals.ty, rotation: transformVals.r});

    // loop
    start(element, boundaries);
}

function start(element, boundaries) {
    if ( !requestId) {
        requestId = requestAnimationFrame(() => onMouseMove(element, boundaries));
    }
}