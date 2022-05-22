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
let firstNumber = null;
let secondNumber = null;
let result = null;
const mainScreen = document.querySelector('#display').querySelector('p.main');
const buffer = document.querySelector('#display').querySelector('p.buffer');

function numberDisplay(e) {
    mainScreen.textContent += e.target.value;
    displayValue.push(mainScreen.textContent);
    firstNumber = parseFloat(displayValue.pop());
}

decimal.addEventListener('click', function (e) {
    if (mainScreen.textContent.includes('.')) {
        return;
    } else if (mainScreen.textContent === '') {
        mainScreen.textContent = 0+e.target.value;
        displayValue.push(mainScreen.textContent);
        firstNumber = parseFloat(displayValue.pop());
    } else {
        mainScreen.textContent += e.target.value;
        displayValue.push(mainScreen.textContent);
        firstNumber = parseFloat(displayValue.pop());
    }
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
        if (result === Infinity || NaN) {
            alert('ERROR');
            clearAll();
        } else {
            clearDisplay();
            currentOperator = button.value;
        }
    });
})

const equalButton = document.querySelector('button.operate');

equalButton.addEventListener('click', function () {
    if (!currentOperator) {
        return;
    } else {
        result = operate(currentOperator, secondNumber, firstNumber);
        secondNumber = result;
        firstNumber = null;
        currentOperator = '';
        if (result === Infinity || NaN) {
            alert('ERROR');
            clearAll();
        } else {
            resultDisplay();
        }
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

const clearBtn = document.querySelector('.clear');

function clearAll() {
    currentOperator = '';
    firstNumber = null;
    secondNumber = null;
    result = null;
    mainScreen.textContent = '';
    buffer.textContent = '';
}

clearBtn.addEventListener('click', clearAll);

const backspaceBtn = document.querySelector('.backspace');

let removed = [];

function backspace() {
    removed = mainScreen.textContent;
    firstNumber = parseFloat(removed.slice(0, -1));
    mainScreen.textContent = removed.slice(0, -1);
}

backspaceBtn.addEventListener('click', backspace);

//keyCode should be replaced with key or code in the future
document.addEventListener('keydown', function (e) {
    const digit = document.querySelector(`#digits button[data-key="${e.keyCode}"]`);
    const backspaceKey = document.querySelector(`#backspace button[data-key="${e.keyCode}"]`);
    const decimalKey = document.querySelector(`#decimal button[data-key="${e.keyCode}"]`);
    const operatorKey = document.querySelector(`#operators button[data-key="${e.keyCode}"]`);
    const equalKey = document.querySelector(`#calculate button[data-key="${e.keyCode}"]`);

    if (digit && !e.shiftKey) {
        mainScreen.textContent += `${e.key}`;
        displayValue.push(mainScreen.textContent);
        firstNumber = parseFloat(displayValue.pop());
    } else if (backspaceKey) {
        removed = mainScreen.textContent;
        firstNumber = parseFloat(removed.slice(0, -1));
        mainScreen.textContent = removed.slice(0, -1);
    } else if (decimalKey) {
        if (mainScreen.textContent.includes('.')) {
            return;
        } else if (mainScreen.textContent === '') {
            mainScreen.textContent = 0 + `${e.key}`;
            displayValue.push(mainScreen.textContent);
            firstNumber = parseFloat(displayValue.pop());
        } else {
            mainScreen.textContent += `${e.key}`;
            displayValue.push(mainScreen.textContent);
            firstNumber = parseFloat(displayValue.pop());
        }
    } else if (operatorKey) {
        if (currentOperator) {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;
            firstNumber = null;
        } else if (!currentOperator && firstNumber && secondNumber) {
            currentOperator = `${e.key}`;
            secondNumber = firstNumber;
            firstNumber = null;
        } else if (!currentOperator && secondNumber) {
            currentOperator = `${e.key}`;
        } else {
            currentOperator = `${e.key}`;
            secondNumber = firstNumber;
            firstNumber = null;
        }
        if (result === Infinity || NaN) {
            alert('ERROR');
            clearAll();
        } else {
            clearDisplay();
            currentOperator = `${e.key}`;
        }
    } else if (equalKey) {
        if (!currentOperator) {
            return;
        } else {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;
            firstNumber = null;
            currentOperator = '';
            if (result === (Infinity || NaN)) {
                alert('ERROR');
                clearAll();
            } else {
                resultDisplay();
            }
        }
    } else if (isNaN(digit) || isNaN(backspaceKey) || isNaN(decimalKey)) return;
});