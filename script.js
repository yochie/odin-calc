let leftOperand = null;
let rightOperand = null;
let operator = null;

let display = document.querySelector(".display");
let displayContent = "";

let calculator = document.querySelector(".calculator");
calculator.addEventListener("click", handleClick);

function handleClick(clickEvent) {
    console.log(clickEvent);
    let content = clickEvent.target.textContent;
    switch (clickEvent.target.className) {
        case "num-button":
            numInput(+content);
            break;
        case "decimal-button":
            decimalInput();
            break;
        case "operation-button":
            operationInput(content);
            break;
        case "equal-button":
            equalInput();
            break;
        case "clear-button":
            clearInput();
            break;
        case "back-button":
            backInput();
            break;
        default:
            throw new Error("Unsupported button clicked");
    }
}

function numInput(num) {
    displayContent += num;
    updateDisplay();
}

function decimalInput() {
    if(displayContent.includes(".")){
        return;
    }
    displayContent += ".";
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayContent;
}

function operate(left, right, operation) {
    switch (operation) {
        case "+":
            return add(left, right);
        case "-":
            return subtract(left, right);
        case "*":
            return multiply(left, right);
        case "/":
            return divide(left, right);
        default:
            throw new Error("Unsupported operation");
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}