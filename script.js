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




/* ========================================
   Phase5-2 / Phase5-3
   Wave + Scroll Animation Final
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================
//        Phase5-3
//        Fade Up Scroll Animation
//     ========================================= */

    const fadeElements =
        document.querySelectorAll(".fade-up");


    if (fadeElements.length) {

        const observer =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add("show");


                        /* 一度表示したら監視終了 */
                        observer.unobserve(entry.target);

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        fadeElements.forEach(element => {

            observer.observe(element);

        });

    }


    /* =========================================
       Phase5-2
       Wave Scroll Animation Final
    ========================================= */

    const waveSections =
        document.querySelectorAll(".wave-top");


    if (waveSections.length) {


        function updateWaveScroll() {

            const scrollAmount =
                window.scrollY;


            waveSections.forEach((section) => {


                /*
                 * Wave 上下移動
                 */
                const waveY =
                    Math.sin(
                        scrollAmount * 0.01
                    ) * 12;


                /*
                 * Wave 左右移動
                 */
                const waveX =
                    Math.sin(
                        scrollAmount * 0.008
                    ) * 8;


                /*
                 * CSS変数として渡す
                 */
                section.style.setProperty(
                    "--wave-y",
                    `${waveY}px`
                );


                section.style.setProperty(
                    "--wave-x",
                    `${waveX}px`
                );

            });

        }


        /*
         * スクロール時にWaveを更新
         */
        window.addEventListener(
            "scroll",
            updateWaveScroll,
            {
                passive: true
            }
        );


        /*
         * 画面サイズ変更時
         */
        window.addEventListener(
            "resize",
            updateWaveScroll
        );


        /*
         * 初期状態
         */
        updateWaveScroll();

    }

});











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