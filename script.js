//main math operators as functions

//addition via rest parameters = sum
// const sum = function (...args) {
//     return args.reduce((previous, current) => {
//         return previous + current;
//     });
// }
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
    switch (operator) {
        case '+':
            return addition(a, b);
        case '-':
            return substraction(a, b);
        case '*':
            return multiplication(a, b);
        case '/':
            return division(a, b);
    }
}

const buttons = document.querySelectorAll('button');
const operators = Array.from(document.querySelector('#operators').querySelectorAll('button'));
const numbers = Array.from(document.querySelector('#digits').querySelectorAll('button'));

let displayValue = [];
let currentOperator = '';
let firstNumber = '';
let secondNumber = '';
let result = '';
const mainScreen = document.querySelector('#display').querySelector('p.main');
const buffer = document.querySelector('#display').querySelector('p.buffer');

//display on screen, push clicked numbers in help array
function numberDisplay(e) {
    mainScreen.textContent += e.target.value;
    displayValue.push(mainScreen.textContent);
    firstNumber = parseFloat(displayValue.pop());
}

numbers.forEach((button) => {
    button.addEventListener('click', numberDisplay);
})

operators.forEach((button) => {
    button.addEventListener('click', function () {

        if (currentOperator) {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;

        } else {
            currentOperator = button.value;
            secondNumber = firstNumber;
            firstNumber = null;
        }
        if (result === Infinity) {
            buffer.textContent = 'ERROR';
            mainScreen.textContent = '';
        } else {
            clearDisplay();
            currentOperator = button.value;
        }
    });
})

const equalButton = document.querySelector('button.operate');

//rework equal btn
equalButton.addEventListener('click', function () {

    result = operate(currentOperator, secondNumber, firstNumber);
    console.log(result);
    if (result === Infinity) {
        buffer.textContent = 'ERROR';
        mainScreen.textContent = '';
    } else {
        resultDisplay();
    }
})

function clearDisplay() {
    buffer.textContent = Math.round(secondNumber * 100) / 100;
    mainScreen.textContent = '';
}

function resultDisplay() {
    buffer.textContent = Math.round(result * 100) / 100;
    mainScreen.textContent = '';
}

// clear button
const clear = document.querySelector('.clear');
function clearAll() {
    currentOperator = '';
    firstNumber = '';
    secondNumber = '';
    result = '';
    mainScreen.textContent = '';
    buffer.textContent = '';
}

clear.addEventListener('click', clearAll);