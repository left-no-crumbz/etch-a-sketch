const gridContainer = document.getElementById("grid-container");
const bgClrPicker = document.getElementById("bg-clr-picker");
const penClrPicker = document.getElementById("pen-clr-picker");
const body = document.getElementById("body");
const rainbowBtn = document.getElementById("rainbow");
const shadingBtn = document.getElementById("shading");
const eraseBtn = document.getElementById("eraser");
const sidebar = document.getElementById("sidebar");
const bytes = new Uint32Array(1);
const slider = document.getElementById("grid-size");
const value = document.getElementById("value");


let penClr = penClrPicker.value;
let rainbowMode = false;
let clicked = false;
let shadingMode = false;
let eraseMode = false;
const DEFAULT_GRID_SIZE = 16;

createGrid(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE);
displayGridSize(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE);


slider.addEventListener("input", getGridSize);

function displayGridSize(size){
	value.textContent = `${size}x${size}`;
}
function getGridSize () {
	const gridSize = slider.value;
	// value.textContent = `${gridSize}x${gridSize}`;
	displayGridSize(gridSize);
	clearGrid();
	createGrid(gridSize, gridSize);
}

function clearGrid() {
	gridContainer.innerHTML = "";
}

function createGrid(width, height) {
	const fragment = document.createDocumentFragment();
	for (let i = 0; i < width; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		for (let j = 0; j < height; j++) {
			const cell = document.createElement("div");
			row.appendChild(cell);
			cell.classList.add("cell");
		}
		fragment.appendChild(row);
	}
	gridContainer.appendChild(fragment);
}


function toggleRainbowMode(enabled) {
	rainbowMode = enabled;
	shadingBtn.disabled = eraseBtn.disabled = enabled;
	shadingBtn.style.cursor = eraseBtn.style.cursor = enabled
		? "not-allowed"
		: "pointer";
	rainbowBtn.style.border = enabled ? "1px solid #7289da" : "";
}

function toggleShadingMode(enabled) {
	shadingMode = enabled;
	rainbowBtn.disabled = eraseBtn.disabled = enabled;
	rainbowBtn.style.cursor = eraseBtn.style.cursor = enabled
		? "not-allowed"
		: "pointer";
	shadingBtn.style.border = enabled ? "1px solid #7289da" : "";
}

function toggleEraseMode(enabled) {
	eraseMode = enabled;
	rainbowBtn.disabled = shadingBtn.disabled = enabled;
	rainbowBtn.style.cursor = shadingBtn.style.cursor = enabled
		? "not-allowed"
		: "pointer";
	eraseBtn.style.border = enabled ? "1px solid #7289da" : "";
}

function handleSidebarClick(event) {
	const { target } = event;
	const { id } = target;

	switch (id) {
		case "rainbow":
			toggleRainbowMode(!rainbowMode);
			break;
		case "shading":
			toggleShadingMode(!shadingMode);
			break;
		case "eraser":
			toggleEraseMode(!eraseMode);
			break;
		default:
			break;
	}
}

sidebar.addEventListener("click", handleSidebarClick);

sidebar.addEventListener("input", (event) => {
	target = event.target;
	if (target.id === "bg-clr-picker") {
		body.style.backgroundColor = target.value;
	} else if (target.id === "pen-clr-picker") {
		penClr = target.value;
	}
});

gridContainer.addEventListener("mouseover", draw);
gridContainer.addEventListener("mousedown", () => {
	clicked = true;
});
gridContainer.addEventListener("mouseup", () => {
	clicked = false;
});

function draw(event) {
	const target = event.target;
	const cellIsClicked = target.classList.contains("cell") && clicked;

	if (!cellIsClicked) return;

	switch (true) {
		case rainbowMode:
			setRainbowMode(target);
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

function setEraseMode(target) {
	target.style.opacity = "1";
	target.style.backgroundColor = "white";
}

function setRainbowMode(target) {
	window.crypto.getRandomValues(bytes);
	const randomValue = bytes[0];
	console.log(randomValue);
	// use bit shifting to reduce compute;
	const r = randomValue & 0xff;
	const g = (randomValue >> 8) & 0xff;
	const b = (randomValue >> 16) & 0xff;

	target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
