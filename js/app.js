
const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");

const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");

let isClicked = false;


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
            cell.addEventListener("mouseover", draw);
            
            cell.addEventListener("mousedown", event => {
                isClicked = true;
            })
            
            cell.addEventListener("mouseup", event => {
                if(isClicked ) {
                    isClicked = false;
                }
            })
        }
        gridContainer.appendChild(row);
    }
}

createGrid(16, 16);

const cell = document.querySelectorAll(".cell");
function draw(event) {
    const target = event.target;
    
    if (isClicked){
        target.style.backgroundColor = "black";
    }

}

bgClrPicker.addEventListener("input", (event) => {
    body.style.backgroundColor = event.target.value;
});
