let leftOperand = null;
let rightOperand = null;
let currentOperator = null;
const MAX_DECIMALS = 9;
const DIV_BY_ZERO = new Error("You're such a bad boy.");

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
        case "calculator":
        case "calculator-row":
            //clicked background
            break;
        default:
            throw new Error("Unsupported button clicked");
    }
}

document.addEventListener("keyup", handleKey);
function handleKey(keyEvent) {
    let key = keyEvent.key;
    if(!isNaN(parseInt(key))){
        handleNum(+key);
    } else {
        switch (key){
            case ".":
                handleDecimal();
                break;
            case "+":
            case "-":
            case "/":
            case "*":
                handleOperation(key);
                break;
            case "=":
            case "Enter":
                handleEqual();
                break;
            case "Escape":
                handleClear();
                break;
            case "Backspace":
                handleBack();
                break;
        }
    }
}

function handleClear() {
    inputNumBuffer = "";
    currentOperator = null;
    leftOperand = null;
    rightOperand = null;
    updateDisplay("");
}

function handleBack() {
    inputNumBuffer = inputNumBuffer.slice(0, -1);
    updateDisplay(inputNumBuffer);
}

function handleOperation(operation) {
    //need at least one defined operand before we start processing second
    if (!inputNumBuffer && !leftOperand) {
        return;
    }

    //prevents reuse of previous result as left operand if you input some numbers
    //except when chaining operators
    if (leftOperand && inputNumBuffer && !currentOperator) {
        leftOperand = null;
    }

    //clean start
    if (!leftOperand) {
        leftOperand = +inputNumBuffer;
        currentOperator = operation;
        inputNumBuffer = "";
    } else {
        //chained operator
        if (currentOperator) {
            //uses previously set left operand and operator
            handleEqual();

            //set up current operator for next operation
            currentOperator = operation;
        } else {
            //reuses previous result with new operator
            currentOperator = operation;

            handleEqual();
        }
    }
}

//returns result of operation using currently set left operand, operator and input num as right operand
function handleEqual() {
    if (currentOperator === null || leftOperand === null || inputNumBuffer === "") {
        return;
    }

    rightOperand = +inputNumBuffer;
    let result;
    try {
        result = operate(leftOperand, rightOperand, currentOperator);
    } catch (e) {
        updateDisplay(e.message);
        leftOperand = null;
        inputNumBuffer = "";
        currentOperator = null;
        return;
    }
    let hasDecimals = result.toString().includes(".");
    if (hasDecimals) {
        let decimals = result.toString().split(".")[1];
        if (decimals.length > MAX_DECIMALS) {
            result = +result.toFixed(MAX_DECIMALS);
        }
    }
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
    if(b == 0){
        throw DIV_BY_ZERO;
    }
    return a / b;
}