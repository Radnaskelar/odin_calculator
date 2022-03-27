//main math operators as functions

//addition via rest parameters
const addition = function(...args) {
    return args.reduce((previous, current) => {
        return previous + current;
    });
}

//substraction
const substraction = (a, b) => a - b;

//multiplication
const multiplication = (a, b) => a * b;

// division
const division = (a, b) => a / b;

//operator
const operate = function (operator, a, b) {
    //if ('+', '-', '*', '/') {}
    return addition(a, b);
}

//display population
const buttons = document.querySelectorAll('button');