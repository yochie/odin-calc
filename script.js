let leftOperand;
let rightOperand;
let operator;

function operate(left, right, operation){
    switch (operation){
        case "+" :
            return add(left, right);
        case "-" :
            return subtract(left, right);
        case "*" :
            return multiply(left, right);
        case "/" :
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