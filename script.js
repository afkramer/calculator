let nums = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
//let zero = document.querySelector(".zero");
let display = document.querySelector(".display");
let console = document.querySelector(".console");

// nums includes decimal but does not include zero
nums.forEach(num => num.addEventListener('click', processNumber));
operators.forEach(operator => operator.addEventListener('click', processOperator));
equals.addEventListener('click', calculate);

//TODO: create eventlisteners for key presses
// TODO (extra): change the CSS styling when the button is being pressed (like in the drumkit tutorial)

initializeDisplay();

// TODO: How do I know which number I am currently processing?
let a = null;
let b = null;
let operator = null;
consoleText = ["","",""];

function processNumber(e){
    
    let num = e.target.innerText;

    // always write the number to b -> other operations will shift the number to a when necessary
    if(b === null){
        
        // This is the first number to be added after hitting "clear" or first calculation
        if (num === "."){
            b = "0."
            decimal.removeEventListener('click', processNumber);
            updateDisplay(b);
        } else if (num !== "0"){
            b = num;
            updateDisplay(b);
        }
    } else {
        if (num === "."){
            decimal.removeEventListener('click', processNumber);
        }
        // b already contains some numbers so we can concatenate the next input
        b += e.target.innerText;
        updateDisplay(b);
    }

}


function processOperator(e){
    // Save operator to the variable
}

function initializeDisplay(){
    display.innerText = "0";
}

function updateDisplay(num){
    display.innerText = num;
}



function calculate(){
    // Check if all the variables are necessary to perform the calculation
    // If everything is there, call the operate function
    // otherwise don't do anything
}

function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
    // handle floats!
    // will need to rely on rounding I think?
}

function divide(a, b){
    if (b === 0){
        return "ERROR";
    }
    return a / b;
    // handle floats!
    // use the rounding function to help
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'ERROR';
    }
    // TODO: save this text to a variable to display it in the calculator console
    // I want to create a running tally of the functions used so far
}

// Rounding function found on:
// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript

function round(value, precision){
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }