let blocks = document.querySelectorAll(".block");
let duration = 0.25;
let stagger = duration;
let repeatDelay = 0.075 * (blocks.length - 1);

gsap.from(".block", 5, {
    scale: 0,
    top: "50%",
    left: "50%",
    transform: "translateZ(-200px)",
    stagger : {
        each: duration,
        repeat: -1,
        repeatDelay: repeatDelay
    }
})