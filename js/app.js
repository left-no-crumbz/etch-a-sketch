
const gridContainer = document.querySelector(".grid-container");
for (let i = 0; i < 16; i++){
    // create rows
    let columns = document.createElement("div");
    columns.classList.toggle("columns");
    for (let j = 0; j < 16; j++){
        // create columns
        let cell = document.createElement("div");
        cell.style.padding = ".84rem";
        // cell.style.border = "2px solid black";
        columns.appendChild(cell);
        cell.classList.toggle("cell");
    }
    gridContainer.appendChild(columns);
}