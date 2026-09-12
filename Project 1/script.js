// Get display
const display = document.getElementById("display");

// Get buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");


// Variables
let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;


// ----------------------------------
// NUMBER BUTTONS
// ----------------------------------

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // If display needs to be reset
        if (shouldResetDisplay) {
            display.value = "0";
            shouldResetDisplay = false;
        }

        // Add number to display
        if (display.value === "0") {
            display.value = button.textContent;
        } 
        else {
            display.value += button.textContent;
        }

    });

});


// ----------------------------------
// OPERATOR BUTTONS
// ----------------------------------

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        firstNumber = display.value;

        operator = button.dataset.value;

        shouldResetDisplay = true;

    });

});


// ----------------------------------
// EQUAL BUTTON
// ----------------------------------

equalsButton.addEventListener("click", function() {

    secondNumber = display.value;

    let num1 = Number(firstNumber);
    let num2 = Number(secondNumber);

    let result;


    // IF-ELSE statements
    if (operator === "+") {

        result = num1 + num2;

    } 
    else if (operator === "-") {

        result = num1 - num2;

    } 
    else if (operator === "*") {

        result = num1 * num2;

    } 
    else if (operator === "/") {

        // Check division by zero
        if (num2 === 0) {

            display.value = "Cannot divide by 0";
            return;

        } 
        else {

            result = num1 / num2;

        }

    } 
    else {

        result = num2;

    }


    // Show result
    display.value = result;

    firstNumber = result;
    operator = "";

});


// ----------------------------------
// CLEAR BUTTON
// ----------------------------------

clearButton.addEventListener("click", function() {

    display.value = "0";

    firstNumber = "";
    secondNumber = "";
    operator = "";

});


// ----------------------------------
// DELETE BUTTON
// ----------------------------------

deleteButton.addEventListener("click", function() {

    if (display.value.length > 1) {

        display.value = display.value.slice(0, -1);

    } 
    else {

        display.value = "0";

    }

});


// ----------------------------------
// DECIMAL BUTTON
// ----------------------------------

decimalButton.addEventListener("click", function() {

    if (!display.value.includes(".")) {

        display.value += ".";

    }

});
