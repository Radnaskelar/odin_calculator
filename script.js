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
        // if statement to check if operator and/or numbers exist
        if (!currentOperator == '') {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;
            
        } else {
            currentOperator = button.value;
            secondNumber = firstNumber;
            firstNumber = 0;
        }

        clearDisplay();
        currentOperator = button.value;
    });
})

const equalButton = document.querySelector('button.operate');

//rework equal btn
equalButton.addEventListener('click', function () {

    if (displayValue.length === 0) {
        secondNumber = 0;
    } else {
        secondNumber = parseFloat(displayValue.pop())
    }

    displayValue.length = 0;
    result = operate(currentOperator, firstNumber, secondNumber);

    console.log(result);

    resultDisplay();
    displayValue.push(result);
    firstNumber = result;


})

function clearDisplay() {
    buffer.textContent = secondNumber;
    mainScreen.textContent = '';
}

function resultDisplay() {
    buffer.textContent = result;
    mainScreen.textContent = '';
}