//main math operators as functions

//addition via rest parameters = sum
const sum = function (...args) {
    return args.reduce((previous, current) => {
        return previous + current;
    });
}
//addition
const addition = (a, b) => a + b;

//substraction
const substraction = (a, b) => a - b;

//multiplication
const multiplication = (a, b) => a * b;

// division
const division = (a, b) => a / b;

//operator
const operate = function (operator, a, b) {
    //if ('+', '-', '*', '/') {}
    if (operator === addition) {
        return addition(a, b);
    }
    if (operator === substraction) {
        return substraction(a, b);
    }
    if (operator === multiplication) {
        return multiplication(a, b);
    }
    if (operator === division) {
        return division(a, b);
    }
}

const buttons = document.querySelectorAll('button');

const numbers = Array.from(document.querySelector('#digits').querySelectorAll('button'));

let displayValue = 0;

numbers.forEach((button) => {
    button.addEventListener('click', function (e) {
        document.querySelector('#display').textContent += e.target.textContent;
    });
    return Array.from(displayValue);
})


