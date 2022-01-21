'use strict'

//*********************************************************************//
//The sequence in which this logic was originally developed:
// 1st creating the grid-making function
// 2nd creating the for loop that adds event listeners to the grid cells
// 3rd getting value from the color picker
// 4th building RGB generator and linking valur to rainbow button
// 5th setting up the clear button
// 6th allowing for grid size change according to user input
// 7th allowing user to change sketch pad's background color
// 8th allowing user to hide grid lines
//********************************************************************/


//Creating variables to store HTML elements and default variables
const gridContainer = document.querySelector('#gridContainer') //html container div that hosts the sketchpad

const gridO = document.querySelector('#gridO'); // input field where user can change nr of grids (ajusting grid size)
let gridSize = gridO.value;

let gridSizeSelection = document.querySelector('#selection'); //repeats grid size number on screen next to the user input 
gridSizeSelection.textContent = gridO.value;

const clearBtn = document.querySelector('#clearBtn'); // button that erases the 'ink' from the sketch area

const defaultBackgroundColor = "#ffffff00"; //set default background color (transparent)

let colorPicker = document.querySelector('#colorPicker'); //select color picker and its value
let colorPicked = colorPicker.value;

//Listening to color picker value change:
colorPicker.addEventListener('change', ()=> { 
        colorPicked = colorPicker.value;
    ;}, false)

//Rainbow color: random RGB generator (RGB numbers range from 0 to 255)

function makeRGB() {
    const R = Math.floor(Math.random()*255);
    const G = Math.floor(Math.random()*255);
    const B = Math.floor(Math.random()*255);
        return `rgb(${R}, ${G}, ${B})`
}
makeRGB()

//Rainbow color button and color picker selection and activation: when rainbow color is selected, the color picker should be de-activated.

const colorPickerContainer = document.querySelector('#colorPickerContainer'); // selection of containers for style purposes
const rainbowContainer = document.querySelector('#rainbowContainer');

let pickerSelected = true;
let rainbowSelected = false;

colorPickerContainer.addEventListener('click', ()=>{
    pickerSelected = true;
    rainbowSelected = false;
    colorPickerContainer.classList.add('colorBtnSelected'); //class changes for style purposes
    rainbowContainer.classList.remove('colorBtnSelected');
})
rainbowContainer.addEventListener('click', ()=>{
    pickerSelected = false;
    rainbowSelected = true;
    colorPickerContainer.classList.remove('colorBtnSelected');
    rainbowContainer.classList.add('colorBtnSelected');
})

//Creating the Grid:

function makeGrid(){
    //Makes grid
    gridContainer.innerHTML = ''; // this erases all children of the container. This way, when user changes grid size (nr of grids), it erases the previously created ones instead of adding in addition to them.
    for (let i = 0; i < gridSize; i++){
        let row = document.createElement('div');
        row.className = "row";
        gridContainer.appendChild(row);
        for (let k = 0; k < gridSize; k++){
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.className += " cellBorder" //this class will be used to show or hide grid lines
            row.appendChild(cell);
        }
    };

    //Bellow: adds event listeners to mouse events inside the sketch area
    //the idea was to enable drawing only when mouse key is pressed
    //Helpful link:  https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript
    //Link that helped me create the function bellow: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event#examples

    let cells = document.querySelectorAll('.cell'); //cell selection inside the function so that it happens every time grid container is erased
    let isDrawing = false;

    for(let cell of cells){ //loop to add event listeners to each grid cell
        cell.addEventListener('mousedown', ()=>{
            isDrawing = true;
        }, false);
        cell.addEventListener('mouseover', ()=> {
            if (isDrawing === true){
                if (pickerSelected){
                    cell.style.backgroundColor = colorPicked ; //uses color picker
                } else if (rainbowSelected){
                    cell.style.backgroundColor = makeRGB(); //uses rainbow
                }
            }
        }, false) 
        cell.addEventListener('mouseup', ()=>{
                isDrawing = false;
            }, false);
        clearBtn.addEventListener('click', ()=>{
            cell.style.backgroundColor = defaultBackgroundColor; //clears drawing board
            gridContainer.style.backgroundColor = defaultBackgroundColor; //resets background color of container
            }, false);
    }

    gridContainer.addEventListener('mouseleave', ()=>{ // this makes sure that isDrawing is set to false if the user releases the mouse key outside of the sketch area
        isDrawing = false;
    })

    //Show or hide grid lines event listener:
    const showGridlines = document.querySelector('#showGridlines') //html checkbox
    for (let cell of cells){
        showGridlines.addEventListener('change', (e)=>{
        if (e.target.checked){
            cell.classList.add('cellBorder');
        } else {
            cell.classList.remove('cellBorder') 
        }
        
    },false)
    }
}
makeGrid();

//Allowing user to change the grid size with a valid input:
//shows warning and ignores user input in case of invalid change attempt
const invalidWarning = document.querySelector('#invalidWarning');

function invalidInput(userinput){
    let input = Math.round(parseInt(userinput));
    console.log(input)
    if ((isNaN(input)) || (input < 1) || (input > 100)){ //only accepts numbers between 1 and 100
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
gridO.addEventListener('change', ()=>{ //gridO = input field where user can change nr of grids (ajusting grid size)
    invalidInput(gridO.value);
}, false)

//Set background color of container
const colorPickerBackground = document.querySelector("#colorPickerBackground");

colorPickerBackground.addEventListener('change', ()=> { 
        gridContainer.style.backgroundColor = colorPickerBackground.value;
        console.log(colorPickerBackground);
    ;}, false)
