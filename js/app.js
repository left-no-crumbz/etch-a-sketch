
const gridContainer = document.querySelector(".container");
for (let i = 0; i < 16; i++){
    // create rows
    let row = document.createElement("div");
    for (let j = 0; j < 16; j++){
        // create columns
        let cell = document.createElement("div");
        cell.style.padding = "1rem";
        cell.style.border = "2px solid #aaa";
        row.appendChild(cell);
    }
    gridContainer.appendChild(row);
}