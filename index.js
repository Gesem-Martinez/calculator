function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch(operator){
        case "+":
            add(num1, num2);
            break;
        case "-":
            substract(num1, num2);
            break;
        case "x":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
    }
}

function populateDisplay(string){
    
}

let number1 = 0;
let operator = "";
let number2 = 0;

let numberButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => !Number.isNaN(Number.parseInt(button.textContent)));

numberButtons.forEach(button => {
    button.addEventListener("click", event => populateDisplay(event.target.textContent));
});