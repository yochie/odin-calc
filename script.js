let leftOperand = null;
let rightOperand = null;
let currentOperator = null;

let display = document.querySelector(".display");
let inputNumBuffer = "";

let calculator = document.querySelector(".calculator");
calculator.addEventListener("click", handleClick);

function handleClick(clickEvent) {
    let content = clickEvent.target.textContent;
    switch (clickEvent.target.className) {
        case "num-button":
            handleNum(+content);
            break;
        case "decimal-button":
            handleDecimal();
            break;
        case "operation-button":
            handleOperation(content);
            break;
        case "equal-button":
            handleEqual();
            break;
        case "clear-button":
            handleClear();
            break;
        case "back-button":
            handleBack();
            break;
        default:
            throw new Error("Unsupported button clicked");
    }
}

function handleOperation(operation) {
    //need at least one defined operand before we start processing second
    if (inputNumBuffer === "" && leftOperand === null) {
        return;
    }

    //prevents reuse of previous result as left operand if you input some numbers before using operators
    //while allowing left operand to persist when operation chaining or supplying right operand
    if(leftOperand !== null && inputNumBuffer !== "" && currentOperator === null){
        leftOperand = null;
    }

    //clean start
    if (leftOperand === null) {
        leftOperand = +inputNumBuffer;
        currentOperator = operation;
        inputNumBuffer = "";
    } else {
        //chained operator
        if (currentOperator !== null) {
            //do equals using previously set left operand and operator
            handleEqual();

            //set up current operator for next input
            currentOperator = operation;
        } else {
            //reusing result of previous operation with new operator
            currentOperator = operation;

            handleEqual();
        }
    }
}

function handleEqual() {
    if (currentOperator === null || leftOperand === null || inputNumBuffer === "") {
        return;
    }

    rightOperand = inputNumBuffer;

    let result = operate(+leftOperand, +rightOperand, currentOperator);
    updateDisplay(result);

    leftOperand = result;

    inputNumBuffer = "";

    currentOperator = null;
}

function handleNum(num) {
    inputNumBuffer += num;

    updateDisplay(inputNumBuffer);
}

function handleDecimal() {
    if (inputNumBuffer.includes(".")) {
        return;
    }

    inputNumBuffer += ".";
    updateDisplay(inputNumBuffer);
}

function updateDisplay(num) {
    display.textContent = num;
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