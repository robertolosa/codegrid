function init() {
    const slider = document.querySelector(".slider");
    const prevBtn = document.querySelector(".slider .nav .prev");
    const nextBtn = document.querySelector(".slider .nav .next");
    const items = document.querySelectorAll(".slider .item")

    let current = 0;
    let isPlaying = false;

    items.forEach((item) => {
        const textWrapper = item.querySelector(".wrap");
        textWrapper.innerHTML = textWrapper.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );
    });

    function anim(current, neew, callback) {
        const currentImgs = current.querySelectorAll(".img");
        const currentText = current.querySelectorAll(".content .letter");
        const neewImgs = neew.querySelectorAll(".img");
        const neewText = neew.querySelectorAll(".content .letter");

        const t = 300;
        const offset = "-=" + t * .4; //?????
        const imgOffset = t * .8; //?????

        const tl = anime.timeline({
            easing: "easeInOutQuint",
            duration: t,
            complete: callback
        });

        tl.add({
            targets: currentText,
            translateY: [0, "-2em"],
            opacity: [1, 0],
            easing: "easeInQuint",
            duration: t,
            delay: (el, i) => 30 * (i + 1)
        }).add({
            targets: currentImgs[0],
            translateY: -600,
            translateZ: 0,
            rotate: [0, "-45deg"],
            opacity: [1, 0],
            easing: "easeInCubic"
        }, offset)
        .add({
            targets: current,
            opacity: 0,
            visibility: "hidden",
            duration: 200,
            easing: "easeInCubic"
        })
        .add({
            targets: neew,
            opacity: 1,
            visibility: "visible",
            duration: 200,
        }, offset)
        .add({
            targets: neewImgs[0],
            translateY: [600, 0],
            translateZ: 0,
            rotate: ["45deg", 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
        }, offset)
        .add({
            targets: neewText,
            translateY: ["2em", 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: t * 1.5,
            delay: (el, i) => 30 * (i + 1)
        }, offset);
    }

    function updateSlider(newIndex) {
        const currentItem = items[current];
        const newItem = items[newIndex];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = newIndex;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }

    function next() {
        if (isPlaying) return;
        isPlaying = true;
        const newIndex = (current === items.length - 1 ? 0 : current + 1);
        updateSlider(newIndex);
    }

    function prev() {
        if (isPlaying) return;
        isPlaying = true;
        const newIndex = (current === 0 ? items.length - 1 : current - 1);
        updateSlider(newIndex);
    }

    //On arrows click
    prevBtn.onclick = prev;
    nextBtn.onclick = next;

    //On slider swipe (desktop and mobile)
    const hammertime = new Hammer(slider);
    hammertime.on('swipeleft', next);
    hammertime.on('swiperight', prev);
}

document.addEventListener("DOMContentLoaded", init);