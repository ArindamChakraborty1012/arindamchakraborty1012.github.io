/* =========================================================
   LOADER / MOVING BOXES
   ========================================================= */

const loaders = document.querySelectorAll(".loader");

const speed = 1;

loaders.forEach((loader) => {

    // Get only boxes belonging to THIS loader
    const boxes = loader.querySelectorAll(".box");

    if (boxes.length === 0) return;

    let loaderWidth;
    let boxWidth;
    let gap;
    let step;

    let positions = [];

    let paused = false;


    /* -----------------------------------------------------
       INITIALIZE
    ----------------------------------------------------- */

    function initialize() {

        loaderWidth = loader.clientWidth;
        boxWidth = boxes[0].offsetWidth;

        // Fixed gap
        gap = 100;

        step = boxWidth + gap;

        positions = [];

        boxes.forEach((box, i) => {

            const x = i * step;

            positions.push(x);

            box.style.left = x + "px";

        });
    }


    initialize();


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener("resize", initialize);


    /* -----------------------------------------------------
       PAUSE WHEN HOVERING OVER BOX
    ----------------------------------------------------- */

    boxes.forEach((box) => {

        box.addEventListener("mouseenter", () => {
            paused = true;
        });

        box.addEventListener("mouseleave", () => {
            paused = false;
        });

    });


    /* -----------------------------------------------------
       ANIMATE BOXES
    ----------------------------------------------------- */

    function animate() {

        if (!paused) {

            for (let i = 0; i < boxes.length; i++) {

                positions[i] -= speed;


                // Box completely left the loader
                if (positions[i] < -boxWidth) {

                    // Find rightmost box
                    const rightMost = Math.max(...positions);

                    // Move current box after rightmost box
                    positions[i] = rightMost + step;
                }


                boxes[i].style.left = positions[i] + "px";
            }
        }

        requestAnimationFrame(animate);
    }


    animate();

});


/* =========================================================
   NAVBAR HEIGHT
   ========================================================= */

const navbar = document.querySelector(".navbar");

function updateNavbarHeight() {

    if (!navbar) return;

    const height = navbar.offsetHeight;

    document.documentElement.style.setProperty(
        "--navbar-height",
        height + "px"
    );
}


updateNavbarHeight();

window.addEventListener("resize", updateNavbarHeight);


/* =========================================================
   SCROLL ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".scroll-element");


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    /*
                       Remove previous animation
                       so it can restart.
                    */
                    entry.target.classList.remove("animate");


                    /*
                       Force browser to reflow.
                       This allows the animation to restart.
                    */
                    void entry.target.offsetWidth;


                    /*
                       Start animation.
                    */
                    entry.target.classList.add("animate");

                } else {

                    /*
                       Remove animation when element
                       leaves the viewport.

                       When it enters again, animation
                       will play again.
                    */
                    entry.target.classList.remove("animate");

                }

            });

        },
        {
            threshold: 0.2
        }
    );


    elements.forEach((element) => {
        observer.observe(element);
    });

});