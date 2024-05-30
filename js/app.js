
const gridContainer = document.querySelector("#grid-container");
const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");
const body = document.querySelector("#body");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const sidebar = document.querySelector(".sidebar");

let penClr = penClrPicker.value;
let rainbowMode = false;
let isClicked = false;
let shadingMode = false; 

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

sidebar.addEventListener("input", (event) => {
    target = event.target;
    if(target.id == "bg-clr-picker"){
        body.style.backgroundColor = target.value
    } else if (target.id === "pen-clr-picker"){
        penClr = target.value;
    }
});

sidebar.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target.id);
    if(target.id === "rainbow"){
        if(rainbowMode) {
            rainbowMode = false;
            target.style.border = "0";
            shadingBtn.disabled = false;
            shadingBtn.style.cursor = "pointer";
        } else {
            rainbowMode = true;
            shadingBtn.disabled = true;
            shadingBtn.style.cursor = "not-allowed";
            target.style.border = "1px solid #7289da";
        }
    } else if (target.id === "shading") {
        if(shadingMode) {
            shadingMode = false;
            target.style.border = "0";
            rainbowBtn.disabled = false;
            rainbowBtn.style.cursor = "pointer";
        } else {        
            shadingMode = true;
            rainbowBtn.disabled = true;
            rainbowBtn.style.cursor = "not-allowed";
            target.style.border = "1px solid #7289da";
        }
    }
});

gridContainer.addEventListener("mouseover", draw);
gridContainer.addEventListener("mousedown", () => {isClicked = true;});
gridContainer.addEventListener("mouseup", () => {isClicked = false;});


function draw(event) {
    const target = event.target;
    let cellIsClicked = target.classList.contains("cell") && isClicked;
    if (cellIsClicked && !rainbowMode && !shadingMode){
        target.style.backgroundColor = penClr;
    } else if(cellIsClicked && rainbowMode) {
        const MAX = 256;
        const MIN = 0;
        let r = Math.floor(Math.random() * (MAX - MIN) + MIN);
        let g = Math.floor(Math.random() * (MAX - MIN) + MIN);
        let b = Math.floor(Math.random() * (MAX - MIN) + MIN);
        target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (cellIsClicked && shadingMode && !rainbowMode){
        target.style.backgroundColor = penClr;
        if (target.style.opacity >= 0.1) {
            target.style.opacity = +target.style.opacity + 0.1;
        } else {
            target.style.opacity = 0.1;
        }
    }

}