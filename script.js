const loader = document.querySelector(".loader");
const boxes = document.querySelectorAll(".box");

const speed = 1;

let visibleBoxes = 5;
let loaderWidth;
let boxWidth;
let gap;
let step;

let positions = [];
let paused = false;

function initialize() {

    loaderWidth = loader.clientWidth;
    boxWidth = boxes[0].offsetWidth;

    // Responsive visible boxes
    if (window.innerWidth < 768) {
        visibleBoxes = 1;
    }
    else if (window.innerWidth < 992) {
        visibleBoxes = 2;
    }
    else {
        visibleBoxes = 5;
    }

    // Space between two boxes
    gap = (loaderWidth - visibleBoxes * boxWidth) / (visibleBoxes - 1);

    // Prevent overlap
    if (gap < 10)
        gap = 10;

    step = boxWidth + gap;

    positions = [];

    boxes.forEach((box, i) => {

        let x;

        if (i < visibleBoxes) {

            // Visible boxes
            x = i * step;

        } else {

            // Hidden boxes start AFTER the last visible box
            x = loaderWidth + (i - visibleBoxes + 1) * step;

        }

        positions.push(x);
        box.style.left = x + "px";

    });

}

initialize();

window.addEventListener("resize", initialize);

loader.addEventListener("mouseenter", () => paused = true);
loader.addEventListener("mouseleave", () => paused = false);

function animate() {

    if (!paused) {

        for (let i = 0; i < boxes.length; i++) {

            positions[i] -= speed;

            if (positions[i] < -boxWidth) {

                const rightMost = Math.max(...positions);

                positions[i] = rightMost + step;

            }

            boxes[i].style.left = positions[i] + "px";

        }

    }

    requestAnimationFrame(animate);

}

animate();