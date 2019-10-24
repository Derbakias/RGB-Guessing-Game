var numSquares = 6;
var color = [];
var squares = document.getElementsByClassName("square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy") {
                numSquares = 3;
                var blinkInterval = 500;
            }
            else {
                numSquares = 6;
                var blinkInterval = 200;
            }
            reset();
        });

    }

    for(var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                messageDisplay.style.color = "white";
                messageDisplay.style.backgroundColor = "steelblue";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?"
                var blinkResetBtn = ["8px solid steelblue" , "8px solid yellow"];
                setInterval( function() { blink(resetButton, blinkResetBtn); }, 500 );
                resetButton.style.backgroundColor = (pickedColor);
                resetButton.style.border = "8px solid steelblue";
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
                var blinkTryAgain = ["8px solid steelblue" , "8px solid orange"];
                setInterval( function() { blink(messageDisplay, blinkTryAgain); }, 500);
                messageDisplay.style.color = "white";
                messageDisplay.style.backgroundColor = "red";
            }
        });
    }
    reset();
}

var j = 0
function blink(element, blinkColors) {
    if ((element.textContent !== "New Colors?") && (element.textContent !== "Correct") && (element.textContent !== "Game Started!")) {
        element.style.transition = "none"
        element.style.border = blinkColors[j];
        j = (j + 1) % color.length;
    }
    else if (messageDisplay.textContent != "Try Again") {
        element.style.border = "8px solid steelblue";
        element.style.backgroundColor = "steelblue"
    }
}


function reset() {
    //generate new colors
    color = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(color[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = color[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }

    //reset h1 bg color to default
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors?"
    //reset message to none
    messageDisplay.textContent = "Game Started!";
    //set bg color to default
    resetButton.style.backgroundColor = ("steelblue");
    resetButton.style.color = ("white");
    resetButton.style.border = ("5 p");
}

// easyBtn.addEventListener("click", function(){
//     numSquares = 3;
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     color = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         if(color[i]){
//             squares[i].style.backgroundColor = color[i];
//         }
//         else{
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click", function(){
//     numSquares = 6;
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     color = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = color[i]
//         squares[i].style.display = " block";
//     }
// });

resetButton.addEventListener("click", function(){
    reset()
    // //generate new colors
    // color = generateRandomColors(numSquares);
    // //pick a new random color from array
    // pickedColor = pickColor();
    // //change colorDisplay to match picked Color
    // colorDisplay.textContent = pickedColor;
    // //change colors of squares
    // for(var i = 0; i < squares.length; i++) {
    //     squares[i].style.backgroundColor = color[i];
    // }
    // //reset h1 bg color to default
    // h1.style.backgroundColor = "steelblue";
    // resetButton.textContent = "New Colors?"
    // //reset message to none
    // messageDisplay.textContent = "";
    // //set bg color to default
    // resetButton.style.backgroundColor = ("steelblue");
    // resetButton.style.color = ("white");
    // resetButton.style.border = ("none");
});

colorDisplay.textContent = pickedColor;



function changeColors(color){
    //loop through all squares
    for(var i = 0; i < squares.length;i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function generateRandomColors(num){
    //make an array
    var arr = []
    //repeat num times
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor(){
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256)
    //pick a "green" from 0 - 255
    var g= Math.floor(Math.random() * 256)
    //pick a "blue" from 0 - 255
    var b= Math.floor(Math.random() * 256)
    //"rgb(r, g, b")
    return `rgb(${r}, ${g}, ${b})`
}

function pickColor(){
    var random = Math.floor(Math.random() * color.length);
    return color[random];
}