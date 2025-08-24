//When a button is pressed, update the calculator
let calculator_screen_font_top = document.querySelector(".calculator_screen_font_top")
let calculator_screen_font_bot = document.querySelector(".calculator_screen_font_bot")

calculator_screen_font_top.textContent = ""
calculator_screen_font_bot.textContent = ""

let number_buttons = document.querySelectorAll(".number_button")
let number_buttons_array = []
let global_screen_array = [] //Filled with global intermediate numbers and symbols
let global_intermediate_number = ''//A floating point number

//Helper function to update text on calculator_screen_font_top
function update_font_top(value) {
    console.log(`Button Pressed should be ${value}`)
    
    //Edge case for DEL Symbol
    if (value == "DEL"){
        return
    }
    
    //Updating global variables
    if (value == "=" && global_intermediate_number != ''){
        global_screen_array.push(global_intermediate_number)
    }
    else if (isSymbol(value)){
        if (global_intermediate_number != ''){
            global_screen_array.push(global_intermediate_number)
            global_intermediate_number = ''
        }
        global_screen_array.push(value)
    }
    else{
        //Updating screen_text and compute_array
        global_intermediate_number += value
    }
    
    calculator_screen_font_top.textContent += value

    //initializing variables
    let calculator_screen_length = calculator_screen_font_top.textContent.length
    let previous_value = calculator_screen_font_top.textContent[calculator_screen_length - 2]
    let current_value = calculator_screen_font_top.textContent[calculator_screen_length - 1]
    let previous_previous_value = calculator_screen_font_top.textContent[calculator_screen_length - 3]
    
    //Checks making sure the numbers with a decimal is valid
    if(typeof previous_previous_value == 'undefined' || isSymbol(previous_previous_value)){
        if (previous_value == '0'){
            //Check if Current is a Decimal
            if (current_value == '.'){
    
            }
            else{
                if (calculator_screen_font_top.textContent.length >= 3) {
                    calculator_screen_font_top.textContent = pop_string(calculator_screen_font_top.textContent, calculator_screen_length - 2)
                    global_screen_array = pop_array(global_screen_array)
                }
                else{
                    calculator_screen_font_top.textContent = shift_string(calculator_screen_font_top.textContent)
                }
            }
        }
    }


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
    console.log("ERROR "+message)
    clearHelper()
    calculator_screen_font_top.textContent = 'ERROR'
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
        produceErrorMessage()
    }
}
//Subtraction Helper
function subtractHelper(value1, value2){
        if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) - parseFloat(value2)
        return(output.toString())
    }
    else {
        produceErrorMessage()
    }
}
//Multiply Helper
function multiplyHelper(value1, value2){
    if (isNumber(value1) && isNumber(value2)) {
        console.log("Returning Zero")
        if ((value1 == 0) || (value2 == 0)){ //Check for zero errors
            return(0)
        }
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
function spliceArray(input_array, start_splice, end_splice, number_between_splice){
    output_array = []
    for (let i=0; i< input_array.length; i++){
        if ((i < start_splice) || (i > end_splice)) {
            output_array.push(input_array[i])
        }
        else if (i == start_splice){
            output_array.push(number_between_splice)
        }
    }
    return(output_array)
}

//Deletes first element from string
function shift_string(string){
    output_string = ''
    for (let i = 1; i<string.length; i++){
        output_string += string[i]
    }
    return(output_string)
}

//Deletes last element from string
function pop_string(string, index = string.length -1){
    output_string = ''
    for (let i = 0; i<string.length; i++){
        if (i == index){

        }
        else{
            output_string += string[i]
        }
    }
    // console.log(`Value of index is ${index}`)
    return(output_string)
}
//Compress Array into a single number
function compressArray(input_array){
    let output_string = ""
    for (let i = 0; i < input_array.length; i ++) {
        output_string += input_array[i].toString()
    }
    return(output_string)
}

//Checks if value is a number
function isNumber(input) { //Fix This! Check if this works for mathematical annotations (also doesnt work for zero)
    if (input >= 0 || input < 0){
        console.log(`isNumber is true for ${input}`)
        return(true)
    }
    else{
        return(false)
    }

    // if (typeof input === 'number'){
    //     return(true)
    // }
    // else{
    //     return(false)
    // }
}

//Checks if element is a decimal symbol
function isDecimal(input) {
    if(input == '.'){
        return(true)
    }
    else{
        return(false)
    }
}

function hasDecimal(input){
    split_input = (""+input).split("")
    for (let i = 0; i < split_input.length; i++){
        if (isDecimal(split_input[i])){
            return(true)
        }
    }

    return(false)
}

//Checks if element is a mathematical symbol
function isSymbol(input) {
    SYMBOL_LIST = ["+", "-", "x", "/", "DEL"] //Consider adding "EXP", "SQRT"... possible expansion for SIN COS TAN | CSC SEC COT 
    for (let i = 0; i< SYMBOL_LIST.length; i++){
        if (input == SYMBOL_LIST[i]){
            return(true)
        }
    }
    return(false)
}

//Deletes the last element in an array
function pop_array(array){
    new_array = []
    if (array.length > 0) {
        for (let i = 0; i < array.length - 1; i++){
            new_array.push(array[i])
        }
    }
    
    return(new_array)
}

//Check if calculator screen says "ERROR"
function checkForErrorMessage(){
    if ((calculator_screen_font_top.textContent == 'ERROR') || (calculator_screen_font_top.textContent == 'NaN')){
        return(true)
    }
    else{
        return(false)
    }
}

//Check for repeated symbol errors
function checkForSymbolIssue(){
    loop_length = global_screen_array.length
    if (isSymbol(global_screen_array[0])){
        produceErrorMessage("First element is a symbol")
    }
    for (let i = 0; i < loop_length-1; i++){
        char_current = global_screen_array[i]
        char_ahead = global_screen_array[i+1]
        if(isSymbol(char_current) && isSymbol(char_ahead)){
            produceErrorMessage("Double symbol found")
            break
        }
    }

    // produceErrorMessage()
}

//Check if there are any stray parentheses without a pair.
function checkForParenthesesIssue(){
    screen_string = calculator_screen_font_top.textContent
    left_parentheses_count = 0
    right_parentheses_count = 0
    for (let i = 0; i< screen_string.length; i++){
        char = screen_string[i]
        if (char == "("){
            left_parentheses_count++
        }
        if (char == ")"){
            right_parentheses_count++
        }
    }

    if (left_parentheses_count == right_parentheses_count){
        return
    }
    else{
        produceErrorMessage()
        return
    }
}
//Checks for multiple decimals within a single number
function checkForRepeatingDecimal() {
    let used_decimal_bool = false
    //Goes through calculator screen and creates array separating numbers and decimals from alternate symbols. Makes sure there aren't multiple decimals contained in a single number.
    for (let i = 0; i < calculator_screen_font_top.textContent.length; i++) {
        char = calculator_screen_font_top.textContent[i]
        if (isNumber(char)){
            //Nothing Happens
        }
        else if (isDecimal(char)){
            if (used_decimal_bool){
                produceErrorMessage("Repeating decimal error")
                return
            }
            used_decimal_bool = true
        }
        else{ //Its a symbol or something
            used_decimal_bool = false
        }
    }
}

//Creates an array of only floating numbers and symbols.
function identifyNumbers(input){
    if (typeof input === 'string'){
        let string = input
        let number_array = []
        let output_array = []
        for (let i = 0; i < string.length; i++){
            char = string[i]
            if (isNumber(char) || isDecimal(char)) {
                number_array.push(char)
            }
            else{
                output_array.push(compressArray(number_array))
                output_array.push(char)
                number_array = []
            }
        }
        return(output_array)
    } 
    else if(Array.isArray(input)){
        // Case only works if the array is processed

    }

}

//computes multiplication and division
function computeMultiplicationDivision(compute_array){
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
            char_current = mult_div_array[i]
            char_previous = mult_div_array[i-1]
            char_ahead = mult_div_array[i+1]
            if (char_current == "x"){
                multiplyedValue = multiplyHelper(char_previous, char_ahead)
                mult_div_array = spliceArray(mult_div_array, i-1, i+1, multiplyedValue)
            }
            else if (mult_div_array[i] == "/"){
                dividedValue = divideHelper(char_previous, char_ahead)
                mult_div_array = spliceArray(mult_div_array, i-1, i+1, dividedValue)
            }
        }
    }

    compute_array = mult_div_array
    return(compute_array)
}

//compute addition and distraction
function computeAdditionSubtraction(compute_array){
    // console.log(`Compute arrate in add sub compute is ${compute_array}`)
    // console.log(compute_array)
    let final_total
    for (let i=0; i < compute_array.length; i++){
        char_current = compute_array[i]
        char_previous = compute_array[i-1]
        char_ahead = compute_array[i+1]
        if (char_current == "+") {
            compute_array[i+1] = addHelper(char_previous, char_ahead)
        }
        else if (char_current == "-") { //consider changing this to a else
            compute_array[i+1] = subtractHelper(char_previous, char_ahead)
        }
    }
    final_total = compute_array[compute_array.length - 1]
    return(final_total)
}
//Clear (CE) Button
function clearHelper(){
    calculator_screen_font_top.textContent = ""
    global_intermediate_number = ""
    global_screen_array = []

}
let clear_button = alternate_buttons[4]
clear_button.addEventListener("click", () => {
    clearHelper()
})

//Removes the right element within a decimal number
function pop_decimal_number(number){
    output_number = (""+number).split("")
    output_number_length = output_number.length
    if (output_number[output_number_length-2]== '.'){
        output_number = pop_string(pop_string(output_number))
    }
    else{
        output_number = pop_string(output_number)
    }

    return(output_number)
}

function pop_number(number){
    output_number = (""+number).split("")
    return(pop_string(output_number))
}

//Delete (DEL) Button
function deleteButton() {
    if (calculator_screen_font_top.textContent != "") {
        console.log(`Value before deleting global_screen_array: ${global_screen_array}`)
        
        //Deletes the numbers on the top of screen
        calculator_screen_font_top.textContent = pop_string(calculator_screen_font_top.textContent)
        
        // for (let i=0; i<4; i++){ //Note here, since DEL is written, I will pop 4 times instead of 1
        // }
        
        //Deletes within global_intermediate_number
        if (global_intermediate_number != ''){
            global_intermediate_number = pop_number(global_intermediate_number)
        }
        else{
            last_index = global_screen_array.length-1
            last_element = global_screen_array[last_index]
            
            //FIX: This is pretty bad code. Consider optimizing
            if (hasDecimal(last_element) && isNumber(last_element)){
                global_screen_array[last_index] = pop_decimal_number(last_element)
            }
            else if (isNumber(last_element)) {
                global_screen_array[last_index] = pop_number(last_element)
            }
            else if (isSymbol(last_element)){
                global_screen_array = pop_array(global_screen_array)
            }  
        }
        
        //Deleting within global_screen_array (This assumes DEL is added to the array)
        // global_screen_array = pop_array(global_screen_array)
        
    }

    console.log(`Final global_screen_array after delete:`)
    console.log(global_screen_array)
}

//Test Delete this later
// test_number = 55.5
// console.log(pop_number(test_number))
// console.log(pop_decimal_number(test_number))

let delete_button = alternate_buttons[6]
delete_button.addEventListener("click", () => {
    deleteButton()
})
//Compute Function
function masterCompute(compute_array = 'Missing Input') {
    // compute_array = identifyNumbers(screen_value) //Should be removed after implementing global_screen_array correctly
    compute_array = computeMultiplicationDivision(compute_array)
    final_total = computeAdditionSubtraction(compute_array)
    
    console.log(`Compute Array is ${compute_array}`)
    global_screen_array = final_total
    calculator_screen_font_top.textContent = final_total
    global_screen_array = []
    global_intermediate_number = final_total
    
}

//Compute math of calculator screen. Instantiate equal button to compute
let equal_button = alternate_buttons[11]
equal_button.addEventListener("click", () => {
    checkForSymbolIssue()
    checkForRepeatingDecimal()
    checkForParenthesesIssue()
    // update_font_top()
    if (!checkForErrorMessage()){
        console.log(`Global Array is ${global_screen_array}`)
        console.log(global_screen_array)
        masterCompute(global_screen_array) //Input here should be global_screen_array
    }
    else{
        produceErrorMessage()
    }
})

//check for error message
//breaks after first set of calculations (will not calculate with existing number on the screen)