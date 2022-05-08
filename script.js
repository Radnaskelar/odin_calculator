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
const decimal = document.querySelector('.decimal');

let displayValue = [];
let currentOperator = '';
let firstNumber = '';
let secondNumber = '';
let result = '';
const mainScreen = document.querySelector('#display').querySelector('p.main');
const buffer = document.querySelector('#display').querySelector('p.buffer');

function numberDisplay(e) {
    mainScreen.textContent += e.target.value;
    displayValue.push(mainScreen.textContent);
    firstNumber = parseFloat(displayValue.pop());
}
// decimal to-do:
decimal.addEventListener('click', function (e) {
    mainScreen.textContent += e.target.value;
    displayValue.push(mainScreen.textContent);
    firstNumber = parseFloat(displayValue.pop());
});

numbers.forEach((button) => {
    button.addEventListener('click', numberDisplay);
})

operators.forEach((button) => {
    button.addEventListener('click', function () {
        if (currentOperator) {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;
            firstNumber = null;
        } else if (!currentOperator && firstNumber && secondNumber) {
            currentOperator = button.value;
            secondNumber = firstNumber;
            firstNumber = null;
        } else if (!currentOperator && secondNumber) {
            currentOperator = button.value;
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

equalButton.addEventListener('click', function () {
    result = operate(currentOperator, secondNumber, firstNumber);
    console.log(result);
    if (result === Infinity || NaN) {
        buffer.textContent = 'ERROR';
        mainScreen.textContent = '';
    } else {
        resultDisplay();
    }
    secondNumber = result;
    firstNumber = null;
    currentOperator = '';
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