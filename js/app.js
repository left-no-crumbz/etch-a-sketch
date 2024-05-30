
const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");

const bgClrPicker = document.querySelector("#bg-clr-picker");
const penClrPicker = document.querySelector("#pen-clr-picker");

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
        fragment.appendChild(row);
    }
    gridContainer.appendChild(fragment);
}

createGrid(100, 100);

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
