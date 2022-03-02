let nums = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");


nums.forEach(num => num.addEventListener('click', processNumber));
operators.forEach(operator => operator.addEventListener('click', processOperator));
equals.addEventListener('click', calculate);
decimal.addEventListener('click', processDecimal);
// Remove listener for the decimal if there is already a decimal in the number array
// Determine which eventlisteners should be active at what point! (after a calculation has been performed, for example)
//TODO: create eventlisteners for key presses
// TODO (extra): change the CSS styling when the button is being pressed (like in the drumkit tutorial)

// TODO: How do I know which number I am currently processing?
let a = null;
let b = null;
let operator = null;
let result = null;
display = "0";
console = null;

function processNumber(e){
    // TODO: concatenate the number
    // be careful if the user enters 0 -> should not add another zero unless after a decimal
    // Should I just have the diplay be 0. and simplify handling of zero and decimals?

    // check which number we are working on, a or b
    // if the number is a decimal
        // remove decimal event listener
        // add zero event listener
    
    
    if(a === null && b === null){
        if(e.target.innerText === "."){
            a = "0."
        }
        a = e.target.innerText;
    }
}

function processDecimal(e){
    // TODO activate listener for zero if it is a legitimate decimal
    // TODO remove listener for decimal if it is a legitimate decimal

}

function resetNumArray(){
    // join the string together and convert to float
    // save the resulting int to the correct variable a or b, depending on if A is null
}

function processOperator(e){
    //
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