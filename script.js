/* ==========================
   Header Scroll
========================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ==========================
   Scroll Animation Ver3.0
========================== */

const animatedElements =
    document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right"
    );


const fadeObserver =
    new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                /* 一度表示したら監視終了 */

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold:0.15

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

    /* スマートフォンでは無効 */

    if(window.innerWidth <= 768){

        parallaxImages.forEach((image) => {

            image.style.transform =
                "translateY(0)";

        });

        return;

    }


    parallaxImages.forEach((image) => {

        const rect =
            image.getBoundingClientRect();


        /* 画面外なら処理しない */

        if(
            rect.bottom <= 0 ||
            rect.top >= window.innerHeight
        ){

            return;

        }


        const imageCenter =
            rect.top + rect.height / 2;


        const windowCenter =
            window.innerHeight / 2;


        const distance =
            imageCenter - windowCenter;


        /*
           動きを控えめにして
           Apple風の自然な奥行きを作る
        */

        const movement =
            distance * -0.04;


        image.style.transform =
            `translateY(${movement}px)`;

    });

}


window.addEventListener(
    "scroll",
    updateParallax,
    { passive:true }
);


window.addEventListener(
    "resize",
    updateParallax
);


updateParallax();


/* ==========================
   Phase3-4-⑤
   Loading Animation
========================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("page-loader");


    if(!loader){

        return;

    }


    setTimeout(() => {

        loader.classList.add("loaded");

    }, 1200);

});


/* ==================================================
Phase4-2
Mobile Menu
================================================== */

const menuToggle =
document.querySelector(".menu-toggle");

const header =
document.querySelector("header");

if(menuToggle && header){

menuToggle.addEventListener("click", function(){

    const isOpen =
        header.classList.toggle("menu-open");


    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );


    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "メニューを閉じる"
            : "メニューを開く"
    );

});


/* ==========================
   Close Menu
   Link Click
========================== */

const menuLinks =
    header.querySelectorAll("nav a");


menuLinks.forEach(function(link){

    link.addEventListener("click", function(){

        header.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "メニューを開く"
        );

    });

});

}