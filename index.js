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

function operate(operators, numbers){
    let result = numbers[0];

    for(let i = 0; i < operators.length; i++){
        let operator = operators[i];

        switch(operator){
            case "+":
                result = add(result, numbers[i + 1]);
                break;
            case "-":
                result = substract(result, numbers[i + 1]);
                break;
            case "x":
                result = multiply(result, numbers[i + 1]);
                break;
            case "/":
                result = divide(result, numbers[i + 1]);
                break;
        }
    }

    return result;
}

function clearDisplay(){
    document.querySelector(".display").textContent = "";
}

function populateDisplay(string){
    let display = document.querySelector(".display");
    let displayContent = display.textContent;

    if(displayContent.length === 10){
        return;
    }

    display.textContent += string;
}

let operators = [];
let numbers = [];

let numberButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => !Number.isNaN(Number.parseInt(button.textContent))
);
let specialButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => Number.isNaN(Number.parseInt(button.textContent)) 
    && button.textContent != "CLEAR" 
    && button.textContent != "DEL"
    && button.textContent != "="
);

let printableButtons = numberButtons.concat(specialButtons);

let equalsBtn = document.querySelector(".equals");
let clearBtn = document.querySelector(".clear");

printableButtons.forEach(button => {
    button.addEventListener("click", event => populateDisplay(event.target.textContent));
});

equalsBtn.addEventListener("click", (event) =>{
    numbers = Number.parseFloat(document.querySelector(".display").textContent.split(/[\/\x\-\+]/g));
    operators = document.querySelector(".display").textContent.match(/[\/\x\-\+]/g);

    let result = operate(operators, numbers);
    clearDisplay();
    populateDisplay(result);
});

clearBtn.addEventListener("click", () => clearDisplay());