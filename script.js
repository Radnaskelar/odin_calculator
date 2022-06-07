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
let currentOperator = null;
let firstNumber = '';
let secondNumber = '';
let result = '';
const mainScreen = document.querySelector('#display').querySelector('p.main');
const buffer = document.querySelector('#display').querySelector('p.buffer');

function numberDisplay(e) {
    if (mainScreen.textContent === '0') {
        return;
    }
    if (mainScreen.textContent.length < 15) {
        mainScreen.textContent += e.target.value;
        displayValue.push(mainScreen.textContent);
        firstNumber = parseFloat(displayValue.pop());
    }
}

decimal.addEventListener('click', function (e) {
    if (mainScreen.textContent.includes('.')) {
        return;
    } else if (mainScreen.textContent === '') {
        mainScreen.textContent = 0 + e.target.value;
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
            if (firstNumber === '') {
                return;
            } else {
                result = operate(currentOperator, secondNumber, firstNumber);
                secondNumber = result;
                firstNumber = '';
            }
        } else if (currentOperator === null && firstNumber && secondNumber) {
            currentOperator = button.value;
            secondNumber = firstNumber;
            firstNumber = '';
        } else if (currentOperator === null && secondNumber) {
            currentOperator = button.value;
        } else {
            currentOperator = button.value;
            secondNumber = firstNumber;
            firstNumber = '';
        }
        if (result === Infinity || result === NaN) {
            alert('ERROR');
            clearAll();
        } else {
            clearDisplay();
            currentOperator = button.value;
        }
        buffer.textContent += currentOperator;
    });
})

const equalButton = document.querySelector('button.operate');

equalButton.addEventListener('click', function () {
    if (currentOperator === null || firstNumber === '') {
        return;
    } else {
        result = operate(currentOperator, secondNumber, firstNumber);
        secondNumber = result;
        firstNumber = '';
        currentOperator = null;
        if (result === Infinity || result === NaN) {
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
    currentOperator = null;
    firstNumber = '';
    secondNumber = '';
    result = '';
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

//keyCode deprecated
document.addEventListener('keydown', function (e) {
    const digit = document.querySelector(`#digits button[data-key="${e.keyCode}"]`);
    const backspaceKey = document.querySelector(`#delete button[data-key="${e.keyCode}"]`);
    const decimalKey = document.querySelector(`#decimal button[data-key="${e.keyCode}"]`);
    const operatorKey = document.querySelector(`#operators button[data-key="${e.keyCode}"]`);
    const equalKey = document.querySelector(`#calculate button[data-key="${e.keyCode}"]`);

    if (digit && !e.shiftKey) {
        if (mainScreen.textContent.length < 15) {
            mainScreen.textContent += `${e.key}`;
            displayValue.push(mainScreen.textContent);
            firstNumber = parseFloat(displayValue.pop())
        };
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
            if (firstNumber === '') {
                return;
            } else {
                result = operate(currentOperator, secondNumber, firstNumber);
                secondNumber = result;
                firstNumber = '';
            }
        } else if (currentOperator === null && firstNumber && secondNumber) {
            currentOperator = `${e.key}`;
            secondNumber = firstNumber;
            firstNumber = '';
        } else if (currentOperator === null && secondNumber) {
            currentOperator = `${e.key}`;
        } else {
            currentOperator = `${e.key}`;
            secondNumber = firstNumber;
            firstNumber = '';
        }
        if (result === Infinity || NaN) {
            alert('ERROR');
            clearAll();
        } else {
            clearDisplay();
            currentOperator = `${e.key}`;
        }
        buffer.textContent += currentOperator;
    } else if (equalKey) {
        if (currentOperator === null || firstNumber === '') {
            return;
        } else {
            result = operate(currentOperator, secondNumber, firstNumber);
            secondNumber = result;
            firstNumber = '';
            currentOperator = null;
            if (result === (Infinity || NaN)) {
                alert('ERROR');
                clearAll();
            } else {
                resultDisplay();
            }
        }
    } else if (isNaN(digit) || isNaN(backspaceKey) || isNaN(decimalKey)) return;
});