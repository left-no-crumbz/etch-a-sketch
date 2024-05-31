
const gridContainer = document.querySelector("#grid-container");
const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");
const body = document.querySelector("#body");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraseBtn = document.querySelector("#eraser");
const sidebar = document.querySelector(".sidebar");

let penClr = penClrPicker.value;
let rainbowMode = false;
let clicked = false;
let shadingMode = false; 
let eraseMode = false; 

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

createGrid(16, 16);

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
            eraseBtn.disabled = false;
            eraseBtn.style.cursor = "pointer";
        } else {
            rainbowMode = true;
            shadingBtn.disabled = true;
            shadingBtn.style.cursor = "not-allowed";
            eraseBtn.disabled = true;
            eraseBtn.style.cursor = "not-allowed";
            target.style.border = "1px solid #7289da";
        }
    } else if (target.id === "shading") {
        if(shadingMode) {
            shadingMode = false;
            target.style.border = "0";
            rainbowBtn.disabled = false;
            rainbowBtn.style.cursor = "pointer";
            eraseBtn.disabled = false;
            eraseBtn.style.cursor = "pointer";
        } else {        
            shadingMode = true;
            rainbowBtn.disabled = true;
            rainbowBtn.style.cursor = "not-allowed";
            eraseBtn.disabled = true;
            eraseBtn.style.cursor = "not-allowed";
            target.style.border = "1px solid #7289da";
        }
    } else if (target.id === "eraser") {
        if(eraseMode){
            eraseMode = false;
            target.style.border = "0";
            rainbowBtn.disabled = false;
            rainbowBtn.style.cursor = "pointer";
            shadingBtn.disabled = false;
            shadingBtn.style.cursor = "pointer";
        } else {
            eraseMode = true;
            rainbowBtn.disabled = true;
            rainbowBtn.style.cursor = "not-allowed";
            shadingBtn.disabled = true;
            shadingBtn.style.cursor = "not-allowed";
            target.style.border = "1px solid #7289da";
        }
    }
});

gridContainer.addEventListener("mouseover", draw);
gridContainer.addEventListener("mousedown", () => {clicked = true;});
gridContainer.addEventListener("mouseup", () => {clicked = false;});


function draw(event) {
    const target = event.target;
    let cellIsClicked = target.classList.contains("cell") && clicked;
    if (cellIsClicked && !rainbowMode && !shadingMode && !eraseMode){
        target.style.backgroundColor = penClr;
    } else if(cellIsClicked && rainbowMode) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (cellIsClicked && shadingMode && !rainbowMode && !eraseMode){
        target.style.backgroundColor = penClr;
        if (target.style.opacity >= 0.1) {
            target.style.opacity = +target.style.opacity + 0.1;
        } else {
            target.style.opacity = 0.1;
        }
    } else if (cellIsClicked && eraseMode && !rainbowMode && !shadingMode){
        target.style.opacity = "1";
        target.style.backgroundColor = "white";
    }

}