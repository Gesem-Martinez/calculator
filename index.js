'use strict';

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
    return num2 === 0 ? "Math Error" : num1 / num2;
}

function modulo(num1, num2){
    return num1 % num2;
}

function operate(operators, numbers){
    numbers = numbers.map((number) => Number.parseFloat(number));
    let result = 0;
    if(!Number.isNaN(numbers[0])) result = numbers[0];

    for(let i = 0; i < operators.length; i++){
        if(Number.isNaN(numbers[i + 1])){
            break;
        };

        let operator = operators[i];

        switch(operator){
            case "+":
                result = add(result, numbers[i + 1]);
                break;
            case "-":
                result = substract(result, numbers[i + 1]);
                break;
            case "x" || "*":
                result = multiply(result, numbers[i + 1]);
                break;
            case "/":
                result = divide(result, numbers[i + 1]);
                break;
            case "%":
                result = modulo(result, numbers[i + 1]);
                break;
        }

        console.log(result);
    }

    return result;
}

function clearDisplay(display){
    display.textContent = "";
    return [];
}

function populateDisplay(string, display){
    let displayContent = display.textContent;

    if(displayContent.length === 10){
        return;
    }

    if(string === "*") string = "x";
    display.textContent += string;
}

function undo(display){
    let textArr = [...display.textContent];
    textArr.splice(textArr.length - 1, 1)
    let modifiedDisplayText = textArr.join("");

    clearDisplay(display);
    populateDisplay(modifiedDisplayText, display);
}

function showResults(display){
    //Variables to store the expression to operate on
    let operators = [];
    let numbers = [];

    numbers = display.textContent.split(/[\%\/\x\-\+]/g);
    operators = display.textContent.match(/[\%\/\x\-\+]/g);

    let result = operate(operators, numbers);
    numbers = clearDisplay(display);
    operators = numbers;
    populateDisplay(result.toString().slice(0, 10), display);
}

//Varible that stores the display element
let display = document.querySelector(".display");

//Array with the number buttons
let numberButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => !Number.isNaN(Number.parseInt(button.textContent))
);
//Array with the operators
let specialButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => Number.isNaN(Number.parseInt(button.textContent)) 
    && button.textContent != "CLEAR" 
    && button.textContent != "DEL"
    && button.textContent != "="
);
let printableButtons = numberButtons.concat(specialButtons);
let equalsBtn = document.querySelector(".equals");
let clearBtn = document.querySelector(".clear");
let backSpaceBtn = document.querySelector(".backspace");
let keyboardInputs = printableButtons.map((btn) => btn.textContent );
keyboardInputs.push("*");

printableButtons.forEach(button => {
    button.addEventListener("click", event => populateDisplay(event.target.textContent, display));
});

equalsBtn.addEventListener("click", (event) =>{
    //console.log(numbers, operators);
    showResults(display);
});

clearBtn.addEventListener("click", () => clearDisplay(display));
backSpaceBtn.addEventListener("click", () => undo(display));

// Keuboard Support
document.addEventListener("keydown", (event) =>{
    let pressedKey = event.key;
    if(keyboardInputs.includes(pressedKey)){
        populateDisplay(pressedKey, display);
    }

    if(pressedKey === "Enter") showResults(display);
    if(pressedKey === "Backspace") undo(display);
    if(pressedKey == "Delete") clearDisplay(display);
});