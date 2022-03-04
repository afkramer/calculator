let nums = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
let display = document.querySelector(".display");
//let calcConsole = document.querySelector(".console");
let consoleLines = Array.from(document.querySelectorAll(".console-line"));

// nums includes decimal sign
nums.forEach(num => num.addEventListener('click', processNumber));
operators.forEach(operator => operator.addEventListener('click', processOperator));
equals.addEventListener('click', calculate);
window.addEventListener('keydown', processKey);
//TODO: create eventlisteners for key presses
// TODO (extra): change the CSS styling when the button is being pressed (like in the drumkit tutorial)

initializeDisplay();

let a = null;
let b = null;
let operator = null;
consoleText = ["","",""];

function processNumber(e){
    
    let num = e.target.innerText;

    // TODO: how to handle zero? What if someone wants to add 0 or divide by zero or something?

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
    operator = e.target.innerText;
    // If the user has entered 0 it doesn't get saved to b
    if (b === null){
        a = 0;
    } else {
        a = b;
        b = null;
    }
    
    initializeDisplay();
    updateConsoleTextOperator(a, operator);
    updateConsole();
}

function processKey(e){
    console.log(e.keyCode);
}

function initializeDisplay(){
    display.innerText = "0";
}

function updateDisplay(num){
    display.innerText = num;
}

function updateConsole(){
    for (let i = 0; i < consoleText.length; i++){
        consoleLines[i].innerText = consoleText[i];
    }
}

function updateConsoleTextOperator(a, operator){
    // Shift the last operations over one
    consoleText[0] = consoleText[1];
    consoleText[1] = consoleText[2];
    consoleText[2] = `${a} ${operator}`;
}

function updateConsoleTextEquals(b, result){
    consoleText[2] += ` ${b} = ${result}`;
}

function calculate(){
    // Check if all the variables are necessary to perform the calculation
    if (a !== null && operator !== null){
        // If b is still null the user entered 0
        if (b === null){
            b = 0;
        }
        
        let temp = operate(operator, parseFloat(a), parseFloat(b));

        // update console with b and result
        updateConsoleTextEquals(b, temp);
        updateConsole();

        // update display with the result
        updateDisplay(temp);

        if(temp !== 'ERROR'){
            b = temp;
        }
    }
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
}

// Rounding function found on:
// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript

function round(value, precision){
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }