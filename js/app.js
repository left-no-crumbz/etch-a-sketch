
const gridContainer = document.querySelector("#grid-container");
const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");
const body = document.querySelector("#body");
const rainbowBtn = document.querySelector("#rainbow");

let penClr = penClrPicker.value;
let rainbowMode = false;
let isClicked = false;

function createGrid(width, height) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < width; i++){
        let row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < height; j++){
            let cell = document.createElement("div");
            row.appendChild(cell);
            cell.classList.toggle("cell");
        }
        fragment.appendChild(row);
    }
    gridContainer.appendChild(fragment);
}

createGrid(32, 32);


gridContainer.addEventListener("mouseover", draw);
gridContainer.addEventListener("mousedown", () => {isClicked = true;});
gridContainer.addEventListener("mouseup", () => {isClicked = false;});

bgClrPicker.addEventListener("input", (event) => {body.style.backgroundColor = event.target.value;});

penClrPicker.addEventListener("input", (event) => {
    console.log(penClr);
    penClr = event.target.value;
});
// TODO:
// - turn rainbow button into a toggle
// - use event delegation in the sidebar for perf
rainbowBtn.addEventListener("click", ()=>{
    console.log(rainbowMode);
    if(rainbowMode) {
        rainbowMode = false;
        event.target.style.border = "0";
    } else {
        rainbowMode = true;
        event.target.style.border = "1px solid white";
    }
});
function draw(event) {
    const target = event.target;
    let cellIsClicked = target.classList.contains("cell") && isClicked;
    if (cellIsClicked && !rainbowMode){
        target.style.backgroundColor = penClr;
    } else if(cellIsClicked && rainbowMode) {
        const MAX = 256;
        const MIN = 0;
        let r = Math.floor(Math.random() * (MAX - MIN) + MIN);
        let g = Math.floor(Math.random() * (MAX - MIN) + MIN);
        let b = Math.floor(Math.random() * (MAX - MIN) + MIN);
        console.log(r);
        console.log(g);
        console.log(b);
        target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }

}