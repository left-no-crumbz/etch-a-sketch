
const gridContainer = document.querySelector("#grid-container");
const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");
const body = document.querySelector("#body");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraseBtn = document.querySelector("#eraser");
const sidebar = document.querySelector(".sidebar");
const bytes = new Uint32Array(1);

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


function toggleRainbowMode(enabled) {
    rainbowMode = enabled;
    shadingBtn.disabled = eraseBtn.disabled = enabled;
    shadingBtn.style.cursor = eraseBtn.style.cursor = enabled ? 'not-allowed' : 'pointer';
    rainbowBtn.style.border = enabled ? '1px solid #7289da' : '';
}

function toggleShadingMode(enabled) {
    shadingMode = enabled;
    rainbowBtn.disabled = eraseBtn.disabled = enabled;
    rainbowBtn.style.cursor = eraseBtn.style.cursor = enabled ? 'not-allowed' : 'pointer';
    shadingBtn.style.border = enabled ? '1px solid #7289da' : '';
}

function toggleEraseMode(enabled) {
    eraseMode = enabled;
    rainbowBtn.disabled = shadingBtn.disabled = enabled;
    rainbowBtn.style.cursor = shadingBtn.style.cursor = enabled ? 'not-allowed' : 'pointer';
    eraseBtn.style.border = enabled ? '1px solid #7289da' : '';
}

function handleSidebarClick(event) {
    const { target } = event;
    const { id } = target;
    
    switch (id) {
        case 'rainbow':
            toggleRainbowMode(!rainbowMode);
            break;
        case 'shading':
            toggleShadingMode(!shadingMode);
            break;
        case 'eraser':
            toggleEraseMode(!eraseMode);
            break;
        default:
            break;
    }
}
  
sidebar.addEventListener('click', handleSidebarClick);

sidebar.addEventListener("input", (event) => {
    target = event.target;
    if(target.id == "bg-clr-picker"){
        body.style.backgroundColor = target.value
    } else if (target.id === "pen-clr-picker"){
        penClr = target.value;
    }
});


gridContainer.addEventListener("mouseover", draw);
gridContainer.addEventListener("mousedown", () => {clicked = true;});
gridContainer.addEventListener("mouseup", () => {clicked = false;});


function draw(event) {
    const target = event.target;
    let cellIsClicked = target.classList.contains("cell") && clicked;

    if(!cellIsClicked) return;

    switch(true){
        case rainbowMode:
            target.style.backgroundColor = generateRGBValue();
            break;
        case shadingMode:
            setShadingMode(target);
            break;
        case eraseMode:
            setEraseMode(target);
            break;
        default:
            target.style.backgroundColor = penClr;
    }
}

function setShadingMode(target) {
    target.style.backgroundColor = penClr;
    if (target.style.opacity >= 0.1) {
        target.style.opacity = +target.style.opacity + 0.1;
    } else {
        target.style.opacity = 0.1;
    }
}

function setEraseMode(target){
    target.style.opacity = "1";
    target.style.backgroundColor = "white";
}
function generateRGBValue(){
    window.crypto.getRandomValues(bytes);
    const randomValue = bytes[0];
    console.log(randomValue);
    // use bit shifting to reduce compute;
    const r = randomValue & 0xFF;
    const g = (randomValue >> 8) & 0xFF;
    const b = (randomValue >> 16) & 0xFF;

    return `rgb(${r}, ${g}, ${b})`;
}