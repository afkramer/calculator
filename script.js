function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0){
        return "ERROR";
    }
    return a / b;
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