//When a button is pressed, update the calculator
let calculator_screen_font_top = document.querySelector(".calculator_screen_font_top")
let calculator_screen_font_bot = document.querySelector(".calculator_screen_font_bot")

calculator_screen_font_top.textContent = ""
calculator_screen_font_bot.textContent = ""

let number_buttons = document.querySelectorAll(".number_button")
let number_buttons_array = []

//Helper function to update text on calculator_screen_font_top
function update_font_top(value) {
    calculator_screen_font_top.textContent += value
}
//Function to create a button for the numbers
function create_button(button) {
    button.addEventListener('click', () => {
        update_font_top(button.textContent)
    })
    return(button)
}

//Error Message Function
function produceErrorMessage(message){
    console.log(message)
    clearHelper()
    calculator_screen_font_top.textContent = "ERROR"
}

//Allows every number button to be interractable with a click
for (let i = 0; i < number_buttons.length; i++) {
    number_buttons_array.push(create_button(number_buttons[i]))
}


//All Alternate Buttons----------------------------------------------------------------------------
let alternate_buttons = document.querySelectorAll(".alternate_button")
let alternate_buttons_array = []

for (let i = 0; i < alternate_buttons.length; i++) {
    alternate_buttons_array.push(create_button(alternate_buttons[i])) //There is a lot wrong here, this is temporary. Update this later
}

//Helper Functions:--------------------------------------------------------------------------------
//Addition Helper
function addHelper(value1, value2){
    if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) + parseFloat(value2)
        return(output.toString())
    }
    else {
        return "skip"
    }
}
//Subtraction Helper
function subtractHelper(value1, value2){
        if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) - parseFloat(value2)
        return(output.toString())
    }
    else {
        return "skip"
    }
}
//Multiply Helper
function multiplyHelper(value1, value2){
        if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) * parseFloat(value2)
        return(output.toString())
    }
    else {
        return "skip"
    }
}
//Division Helper
function divideHelper(value1, value2){
        if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) / parseFloat(value2)
        return(output.toString())
    }
    else {
        return "skip"
    }
}

//Splice Array removing a section of the array with a single element
function spliceArray(input_array, start_splice, end_splice, splice_number){
    output_array = []
    for (let i=0; i< input_array.length; i++){
        if ((i < start_splice) || (i > end_splice)) {
            output_array.push(input_array[i])
        }
        else if (i == start_splice){
            output_array.push(splice_number)
        }
    }
    console.log(output_array)
    return(output_array)
}

function shift(array){
    output_array = []
    for (let i = 1; i<array.length; i++){
        output_array.push(array[i])
    }
    return(output_array)
}
//Compress Array into a single number
function compressArray(input_array){
    let output_string = ""
    for (let i = 0; i < input_array.length; i ++) {
        output_string += input_array[i].toString()
    }
    return(output_string)
}

function isNumber(input) { //Fix This! Check if this works for mathematical annotations
    if (input >= 0 || input < 0){
        return(true)
    }
    else{
        return(false)
    }
}

function isDecimal(input) {
    if(input == '.'){
        return(true)
    }
    else{
        return(false)
    }
}

function popFunction(array){
    new_array = []
    if (array.length > 0) {
        for (let i = 0; i < array.length - 1; i++){
            new_array.push(array[i])
        }
    }
    return compressArray(new_array)
}
//Clear (CE) Button
function clearHelper(){
    calculator_screen_font_top.textContent = ""
}
let clear_button = alternate_buttons[4]
clear_button.addEventListener("click", () => {
    clearHelper()
})

//Delete (DEL) Button
function deleteButton() {
    if (calculator_screen_font_top.textContent != "") {
        console.log("Deleted")
        //Note here, since DEL is written, I will pop 4 times instead of 1
        for (let i=0; i<4; i++){
            calculator_screen_font_top.textContent = popFunction(calculator_screen_font_top.textContent)
        }
    }
}
let delete_button = alternate_buttons[6]
delete_button.addEventListener("click", () => {
    deleteButton()
})
//Compute Function
function compute() {
    compute_array = []
    let current_number = 0
    let current_number_array = []
    let used_decimal_bool = false

    //future assignment: figure how to add 09 + 09
    //Goes through calculator screen and creates array separating numbers and decimals from alternate symbols
    for (let i = 0; i < calculator_screen_font_top.textContent.length; i++) {
        char = calculator_screen_font_top.textContent[i]
        if (isNumber(char)) {
            current_number_array.push(char)
        }
        else if (isDecimal(char)){
            if (used_decimal_bool) {
                console.log("Error Message in compute")
                produceErrorMessage()
                return
            }
            current_number_array.push(char)
            used_decimal_bool = true
        }
        else {
            current_number = compressArray(current_number_array)
            compute_array.push(current_number)
            compute_array.push(calculator_screen_font_top.textContent[i])
            current_number_array = []
            used_decimal_bool = false

        }
    }
    //Performing multiplication and divsion first
    //Counting 
    multiplication_division_counter = 0
    for (let i=0; i < compute_array.length; i++){
        if ((compute_array[i] == "x") || (compute_array[i] == "/")){
            multiplication_division_counter += 1
        }
    }
    //Computing multiplication and division
    let mult_div_array = compute_array
    for (let j=0; j < multiplication_division_counter; j++){
        for (let i=0; i< mult_div_array.length; i++){
            if (mult_div_array[i] == "x"){
                multiplyedValue = multiplyHelper(mult_div_array[i-1], mult_div_array[i+1])
                mult_div_array = spliceArray(mult_div_array, i-1, i+1, multiplyedValue)
            }
            else if (mult_div_array[i] == "/"){
                dividedValue = divideHelper(mult_div_array[i-1], mult_div_array[i+1])
                mult_div_array = spliceArray(mult_div_array, i-1, i+1, dividedValue)
            }
        }
    }

    compute_array = mult_div_array
    //Checking for mathematical notations
    for (let i=0; i < compute_array.length; i++){
        if (compute_array[i] == "+") {
            intermediate_value = addHelper(compute_array[i-1], compute_array[i+1])
            if (intermediate_value == "skip"){
                produceErrorMessage()
                break
            }
            else {
                compute_array[i+1] = intermediate_value
            }
        }
        else if (compute_array[i] == "-") {
            console.log("subtraction found")
            intermediate_value = subtractHelper(compute_array[i-1], compute_array[i+1])
            if (intermediate_value == "skip"){
                produceErrorMessage()
                break
            }
            else {
                compute_array[i+1] = intermediate_value
            }
        }
        else if (compute_array[i] == "="){
            clearHelper()
            calculator_screen_font_top.textContent = compute_array[i-1]
        }
    }
    console.log(compute_array)
}
let equal_button = alternate_buttons[11]
equal_button.addEventListener("click", () => {
    compute()
})

//looking for function

// document.getElementById("number_button").onclick = () => {
//     console.log("Button pressed")
// }
