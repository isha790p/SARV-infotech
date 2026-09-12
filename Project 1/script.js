const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentValue = "";
let previousValue = "";
let operator = null;

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            handleInput(value);
        }

        if (action === "clear") {
            clearCalculator();
        }

        if (action === "delete") {
            deleteLast();
        }

        if (action === "calculate") {
            calculate();
        }
    });
});


function handleInput(value) {

    // Number
    if (!isNaN(value)) {
        currentValue += value;
        updateDisplay();
        return;
    }

    // Decimal
    if (value === ".") {

        if (!currentValue.includes(".")) {
            currentValue = currentValue === "" ? "0." : currentValue + ".";
        }

        updateDisplay();
        return;
    }

    // Percentage
    if (value === "%") {

        if (currentValue !== "") {
            currentValue = String(parseFloat(currentValue) / 100);
        }

        updateDisplay();
        return;
    }

    // Operator
    if (["+", "-", "*", "/"].includes(value)) {

        if (currentValue === "" && previousValue === "") {
            return;
        }

        if (currentValue !== "" && previousValue !== "") {
            calculate();
        }

        operator = value;

        previousValue = currentValue;
        currentValue = "";

        updateDisplay();
    }
}


function calculate() {

    if (previousValue === "" || currentValue === "" || operator === null) {
        return;
    }

    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                currentDisplay.textContent = "Error";
                previousDisplay.textContent = "";
                resetValues();
                return;
            }

            result = num1 / num2;
            break;
    }

    currentValue = String(
        Math.round((result + Number.EPSILON) * 100000000) / 100000000
    );

    previousValue = "";
    operator = null;

    updateDisplay();
}


function clearCalculator() {
    currentValue = "";
    previousValue = "";
    operator = null;

    updateDisplay();
}


function deleteLast() {
    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}


function resetValues() {
    currentValue = "";
    previousValue = "";
    operator = null;
}


function updateDisplay() {

    currentDisplay.textContent =
        currentValue === "" ? "0" : currentValue;

    if (previousValue !== "" && operator !== null) {

        const symbol = {
            "+": "+",
            "-": "−",
            "*": "×",
            "/": "÷"
        };

        previousDisplay.textContent =
            `${previousValue} ${symbol[operator]}`;
    } else {
        previousDisplay.textContent = "";
    }
}


/* Keyboard support */

document.addEventListener("keydown", event => {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        handleInput(key);
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleInput(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearCalculator();
    }

    if (key === "%") {
        handleInput("%");
    }
});
