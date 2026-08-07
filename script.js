const loader = document.querySelector(".loader");
const boxes = document.querySelectorAll(".box");

const visibleBoxes = 5;
const speed = 1;          // pixels per frame

const loaderWidth = loader.clientWidth;
const boxWidth = boxes[0].offsetWidth;;

/* Equal spacing so exactly 4 boxes are visible */
const spacing = (loaderWidth - boxWidth) / (visibleBoxes - 1);

/* Initial positions */
let positions = [];

boxes.forEach((box, i) => {

    let x;

    if(i < visibleBoxes){
        x = i * spacing;
    }else{
        x = loaderWidth + (i-visibleBoxes+1)*spacing;
    }

    positions.push(x);

    box.style.left = x + "px";
});

let paused = false;

loader.addEventListener("mouseenter", () => {
    paused = true;
});

loader.addEventListener("mouseleave", () => {
    paused = false;
});

function animate(){

    if(!paused){
        for(let i=0;i<boxes.length;i++){

            positions[i]-=speed;

            /* Re-enter immediately after leaving */
            if(positions[i] < -boxWidth){

                let max = Math.max(...positions);

                positions[i] = max + spacing;
            }

            boxes[i].style.left = positions[i]+"px";
        }
    }

    requestAnimationFrame(animate);
}

animate();