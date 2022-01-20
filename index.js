'use strict'

//Making grid
const gridContainer = document.querySelector('#gridContainer') //div holder of sketch pad

const gridO = document.querySelector('#gridO'); //input field where user can change nr of grids (ajusting grid size)
let gridSize = gridO.value;

let gridSizeSelection = document.querySelector('#selection'); //repeats grid size number on screen
gridSizeSelection.textContent = gridO.value;

function makeGrid(){
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++){
        let row = document.createElement('div');
        row.className = "row";
        row.className += ` row-${([i + 1])}`
        gridContainer.appendChild(row);
        for (let k = 0; k < gridSize; k++){
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.className += ` cell-${[k + 1]}`
            row.appendChild(cell);
        }
    }
}
makeGrid();



//making sure grid size has a value between 1 and 100:
const invalidWarning = document.querySelector('#invalidWarning');

function invalidInput(userinput){
    let input = Math.round(parseInt(userinput));
    console.log(input)
    if ((isNaN(input)) || (input < 1) || (input > 100)){
        gridO.classList.add('invalid');
        invalidWarning.classList.add('showWarning');
    } else {
        gridO.classList.remove('invalid');
        invalidWarning.classList.remove('showWarning');
        gridSize = gridO.value;
        gridSizeSelection.textContent = gridO.value;
        makeGrid();
    }
}

//event listener to change grid size according to user input:
gridO.addEventListener('change', ()=>{
    invalidInput(gridO.value);
}, false)


//color picker selection
const cells = document.querySelectorAll('.cell');
let colorPicker = document.querySelector('#colorPicker');
let colorPicked = colorPicker.value;

colorPicker.addEventListener('change', ()=> {
        colorPicked = colorPicker.value;
    ;}, false)

//painting with selected color and clear button
let defaultBackgroundColor = "#ffffff00";

const clearBtn = document.querySelector('#clearBtn');

//Bellow the original (with color picker only). As the rainbow button was added, the code changed (see the re-worked section bellow).

// for (let cell of cells){
//     cell.addEventListener('mouseover', ()=>{
//         cell.style.backgroundColor = colorPicked;
//     }, false)
//     clearBtn.addEventListener('click', ()=>{
//         cell.style.backgroundColor = defaultBackgroundColor;
//     }, false);;
// }


//rainbow color: random RGB generator (RGB numbers range from 0 to 255)

function makeRGB() {
    const R = Math.floor(Math.random()*255);
    const G = Math.floor(Math.random()*255);
    const B = Math.floor(Math.random()*255);
        return `rgb(${R}, ${G}, ${B})`
}
makeRGB()

//rainbow color button selection and activation

const colorPickerContainer = document.querySelector('#colorPickerContainer');
const rainbowContainer = document.querySelector('#rainbowContainer');

let pickerSelected = true;
let rainbowSelected = false;

colorPickerContainer.addEventListener('click', ()=>{
    pickerSelected = true;
    rainbowSelected = false;
    colorPickerContainer.classList.add('colorBtnSelected');
    rainbowContainer.classList.remove('colorBtnSelected');
})
rainbowContainer.addEventListener('click', ()=>{
    pickerSelected = false;
    rainbowSelected = true;
    colorPickerContainer.classList.remove('colorBtnSelected');
    rainbowContainer.classList.add('colorBtnSelected');
})

//painting with selected color and clear button
for (let cell of cells){
    cell.addEventListener('mouseover', ()=>{
        if (pickerSelected){
            cell.style.backgroundColor = colorPicked ; //uses color picker
        } else if (rainbowSelected){
            cell.style.backgroundColor = makeRGB(); //uses rainbow
        }
    }, false);
        
    clearBtn.addEventListener('click', ()=>{
        cell.style.backgroundColor = defaultBackgroundColor; //clears drawing board
        }, false);
}




//Pen selection efect NOT IDEAL






// function paintOver(){
//     for(let cell of cells){
//         cell.addEventListener('mouseover', function (){
//             cell.style.backgroundColor = colorPicked;
//         }, false);
//     }
//     console.log(colorPicked)
// }
// paintOver()

//clear button 

// // 
// // 




// if want to paint only when mouse pressed: https://stackoverflow.com/questions/18584389/listen-to-mouse-hold-event-on-website








