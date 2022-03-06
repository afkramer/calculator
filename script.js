let nums = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
let display = document.querySelector(".display");
let consoleLines = Array.from(document.querySelectorAll(".console-line"));
let backspace = document.querySelector(".backspace");
let clear = document.querySelector(".clear");

// nums includes decimal sign
nums.forEach(num => num.addEventListener('click', processNumber));
operators.forEach(operator => operator.addEventListener('click', processOperator));
equals.addEventListener('click', calculate);
window.addEventListener('keydown', passOnKey);
backspace.addEventListener('click', processBackspace);
clear.addEventListener('click', processClear);
// TODO (extra): change the CSS styling when the button is being pressed (like in the drumkit tutorial)

initializeDisplay();

let a = null;
let b = null;
let operator = null;
consoleText = ["","",""];

// TODO: deal with decimals now that I am also accepting key presses
    // Add and subtract are good, what about multiplying and dividing?

// TODO: package code into a main() function

function passOnKey(e){
    let key = e.key;
    console.log(key);
    // Determine what event we are working with
    if (key >= 0 && key <= 9 || key === '.'){
        processNumber(key);
    } else if (key === '=' || key === 'Enter'){
        calculate();
    } else if (key === '+' || key === '-' || key === 'x' || key === '/' || key === '*' || key === 'X'){
        processOperator(key);
    } else if (key === 'Backspace'){
        processBackspace();
    } else if (key === 'Delete'){
        processClear();
    }
}

function passOnNumber(e){
    processNumber(e.target.innerText);
}

function passOnOperator(e){
    processOperator(e.target.innerText);
}

function processNumber(num){

    // always write the number to b -> other operations will shift the number to a when necessary
    if(b === null){
        
        // This is the first number to be added after hitting "clear" or first calculation
        if (num === "."){
            b = "0."
            updateDisplay(b);
        } else if (num !== "0"){
            b = num;
            updateDisplay(b);
        }
    } else {
        if (b.length < 16){
            if (num === "."){
                if (b.indexOf(".") === -1){
                    b += num;
                }
            } else {
                b += num;
            }
        }
        updateDisplay(b);
    }

}

function processBackspace(){
    if (b === "0." || b.length === 1){
        b = null;
        initializeDisplay();
    } else if (b !== null){
        b = b.substring(0, b.length - 1);
        updateDisplay(b);
    }
}

function processOperator(operatorInput){
    if (b === null){
        b = 0;
    }
    
    if (operator !== null){
        calculate();
    }

    a = b;
    b = null;
    operator = operatorInput;
    initializeDisplay();
    updateConsoleTextOperator(a, operator);
    updateConsole();
}

function processClear(){
    initializeDisplay();
    a = null;
    b = null;
    operator = null;
    consoleText = ["","",""];
    updateConsole();
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
        
        let temp = operate(operator, a, b);

        // update console with b and result
        updateConsoleTextEquals(b, temp);
        updateConsole();

        // update display with the result
        updateDisplay(temp);

        if(temp !== 'ERROR'){
            b = temp;
        }

        operator = null;
    }
}

function add(a, b){
    let maxPrecision = determineMaxPrecision(a, b); 
    return round(parseFloat(a) + parseFloat(b), maxPrecision);
}

function subtract(a, b){
    let maxPrecision = determineMaxPrecision(a, b);
    return round(a - b, maxPrecision);
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
        case 'X':
            return multiply(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'ERROR';
    }
}

function determineMaxPrecision(...nums){
    // Determine the number with the max number of places after the decimal
    let maxPrecision = 0;
    for(let i = 0; i < nums.length; i++){
        let num = (nums[i]).toString();
        let precision = num.length - num.indexOf(".") - 1;
        if (precision > maxPrecision){
            maxPrecision = precision;
        }
    }

    return maxPrecision;
}

// Rounding function found on:
// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript

function round(value, precision){
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }