
const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");

const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");

const cell = document.querySelectorAll(".cell");
function draw(event) {
    console.log(`Mouse entered ${event.target}`)         
}

function createGrid(width, height) {
    for (let i = 0; i < width; i++){
        // create columns
        let row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < height; j++){
            // create rows
            let cell = document.createElement("div");
            
            
            // MY CURRENT SOLUTION FOR HOVERING:
            // put an id to each cell and then color them black.
            // cell.style.border = "2px solid black";
            row.appendChild(cell);
            cell.classList.toggle("cell");
        }
        gridContainer.appendChild(row);
    }
}


gridContainer.addEventListener("mouseenter", draw);
bgClrPicker.addEventListener("input", (event) => {
    body.style.backgroundColor = event.target.value;
});

createGrid(16, 16);