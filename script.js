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
let currentOperator;
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
const mainScreen = document.querySelector('#display').querySelector('p.main');
const buffer = document.querySelector('#display').querySelector('p.buffer');

//display on screen, push clicked numbers in help array
function numberDisplay(e) {
    mainScreen.textContent += e.target.value;
    displayValue.push(mainScreen.textContent);
}

numbers.forEach((button) => {
    button.addEventListener('click', numberDisplay);
})

//add an if statement later for all operators
operators.forEach((button) => {
    button.addEventListener('click', function () {
        //currentOperator = addition(); //if goes here

        firstNumber = parseInt(displayValue.pop());
        displayValue.length = 0;

        clearDisplay();
    });
})

const equalButton = document.querySelector('button.operate');


equalButton.addEventListener('click', function () {

    secondNumber = parseInt(displayValue.pop())
    displayValue.length = 0;
    result = addition(firstNumber, secondNumber);
    console.log(result);

    resultDisplay();

})

function clearDisplay() {
    buffer.textContent = firstNumber;
    mainScreen.textContent = '';
}

function resultDisplay() {
    buffer.textContent = result;
    mainScreen.textContent = '';
}