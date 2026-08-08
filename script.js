window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

/* ==========================
Scroll Animation
========================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:0.2

});

/* ===========================
   Scroll Animation Ver3.0
=========================== */

const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right"
);

const fadeObserver = new IntersectionObserver((entries, observer) => {


    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            // 一度表示したら監視終了
            fadeObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach(element => {
    fadeObserver.observe(element);
});

/* ==========================
   Phase3-4-④
   Parallax-like Scroll
========================== */

const parallaxImages =
    document.querySelectorAll(".parallax-image");

function updateParallax(){

    if(window.innerWidth <= 768){

        parallaxImages.forEach((image) => {

            image.style.transform =
                "translateY(0)";

        });

        return;

    }

    const scrollY =
        window.scrollY;

    parallaxImages.forEach((image) => {

        const rect =
            image.getBoundingClientRect();

        const imageCenter =
            rect.top + rect.height / 2;

        const windowCenter =
            window.innerHeight / 2;

        const distance =
            imageCenter - windowCenter;

        const movement =
            distance * -0.06;

        image.style.transform =
            `translateY(${movement}px)`;

    });

}

window.addEventListener(
    "scroll",
    updateParallax
);

window.addEventListener(
    "resize",
    updateParallax
);

updateParallax();