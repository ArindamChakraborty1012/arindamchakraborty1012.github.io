const loaders = document.querySelectorAll(".loader");

const speed = 1;
const visibleBoxes = 5;

loaders.forEach(loader => {

    // Get only the boxes belonging to THIS loader
    const boxes = loader.querySelectorAll(".box");

    if (boxes.length === 0) return;

    let loaderWidth;
    let boxWidth;
    let gap;
    let step;
    let positions = [];
    let paused = false;

    function initialize() {

        loaderWidth = loader.clientWidth;
        boxWidth = boxes[0].offsetWidth;

        // Fixed gap between boxes
        gap = 100;

        step = boxWidth + gap;

        positions = [];

        boxes.forEach((box, i) => {

            // Place every box with equal spacing
            let x = i * step;

            positions.push(x);

            box.style.left = x + "px";
        });
    }

    initialize();

    // Recalculate when window size changes
    window.addEventListener("resize", initialize);

    // Pause only when hovering over a box
    boxes.forEach(box => {

        box.addEventListener("mouseenter", () => {
            paused = true;
        });

        box.addEventListener("mouseleave", () => {
            paused = false;
        });

    });

    function animate() {

        if (!paused) {

            for (let i = 0; i < boxes.length; i++) {

                positions[i] -= speed;

                // Box has completely left the loader
                if (positions[i] < -boxWidth) {

                    // Find rightmost box
                    const rightMost = Math.max(...positions);

                    // Put this box after the rightmost box
                    positions[i] = rightMost + step;
                }

                boxes[i].style.left = positions[i] + "px";
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

});