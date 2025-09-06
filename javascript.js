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
    if(typeof previous_previous_value == undefined || isSymbol(previous_previous_value)){
        if (previous_value == '0'){
            //Check if Current is a Decimal
            if (current_value == '.'){
    
            }
            else{
                if (calculator_screen_font_top.textContent.length >= 3) {
                    calculator_screen_font_top.textContent = pop_string(calculator_screen_font_top.textContent, calculator_screen_length - 2)
                    // global_screen_array = pop_array(global_screen_array) //Maybe dont need?
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
        produceErrorMessage("Not adding numbers")
    }
}
//Subtraction Helper
function subtractHelper(value1, value2){
    if (isNumber(value1) && isNumber(value2)) {
        output = parseFloat(value1) - parseFloat(value2)
        return(output.toString())
    }
    else {
        produceErrorMessage("Not subtracting numbers")
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
        produceErrorMessage("Missing input pair for multiplyHelper")
    }
}
//Division Helper
function divideHelper(value1, value2){
    if (isNumber(value1) && isNumber(value2)) {
        if (value2 == 0){
            produceErrorMessage("Division by Zero")
        }
        if (value1 == 0){
            return(0)
        }
        output = parseFloat(value1) / parseFloat(value2)
        return(output.toString())
    }
    else {
        produceErrorMessage("Missing input pair for divideHelper")
    }
}

//Splice Array removing a section of the array with a single element
function spliceArray(input_array, start_splice, end_splice, number_between_splice){
    output_array = []
    for (let i=0; i< input_array.length; i++){
        element = input_array[i]
        if ((i < start_splice) || (i > end_splice)) {
            output_array.push(element)
        }
        else if (i == start_splice){ //Accepts both arrays and numbers
            if (isNumber(number_between_splice)){
                output_array.push(number_between_splice)
            }
            else if (isArray(number_between_splice)){
                for (let j=0; j< number_between_splice.length; j++){
                    output_array.push(number_between_splice[i])
                }
            }
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
    if (typeof input === 'number'){
        console.log("IsNumber Triggered typeof")
        return(true)
    }
    else if (input >= 0 || input < 0){
        console.log(`isNumber, ${input} is a number`)
        return(true)
    }
    else{
        console.log(`isNumber, ${input} is NOT a number`)
        return(false)
    }
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
    SYMBOL_LIST = ["+", "-", "x", "/", "DEL", "(", ")"] //Consider adding "EXP", "SQRT"... possible expansion for SIN COS TAN | CSC SEC COT 
    for (let i = 0; i< SYMBOL_LIST.length; i++){
        if (input == SYMBOL_LIST[i]){
            return(true)
        }
    }
    return(false)
}

//Checks if element should be excluded from the update_font_top function
// function isExcludedSymbol(input){
//     EXCLUDED_LIST = ["DEL", "(", ")"]
//     for (let i = 0; i< EXCLUDED_LIST.length; i++){
//         if (input == EXCLUDED_LIST[i]){
//             return(true)
//         }
//     }
//     return(false)
// }

function isParentheses(input){
    if (input == "(" || input == ")"){
        return(true)
    }
    else{
        return(false)
    }
}

function isNegative(input){
    if (input < 0){
        return(true)
    }
    else{
        return(false)
    }
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
    if (isSymbol(global_screen_array[0]) && !isParentheses(global_screen_array[0]) && !isNegative(global_screen_array[0])){
        produceErrorMessage("First element is a symbol")
    }
    for (let i = 0; i < loop_length-1; i++){
        char_current = global_screen_array[i]
        char_ahead = global_screen_array[i+1]
        if(isSymbol(char_current) && isSymbol(char_ahead) && !isParentheses(char_current) && !isParentheses(char_ahead)){
            produceErrorMessage("Double symbol found")
            break
        }
    }
}

//Check if there are any stray parentheses without a pair.
function checkForParenthesesIssue(){
    screen_string = calculator_screen_font_top.textContent
    left_parentheses_count = 0
    right_parentheses_count = 0
    
    let char
    let previousChar
    for (let i = 0; i< screen_string.length; i++){
        char = screen_string[i]
        if (i > 0){
            previousChar = screen_string[i-1]
        }  
        if (char == "("){
            left_parentheses_count++
        }
        if (char == ")"){
            right_parentheses_count++
        }
        
        if (previousChar == "(" && char == ")"){
            produceErrorMessage("Parentheses not being used")   
            return(undefined) 
        }
    }

    if (left_parentheses_count == right_parentheses_count){
        return(left_parentheses_count)
    }
    else{
        produceErrorMessage("Unequal number of opened and closed parentheses")
        return(undefined)
    }

    
}
//Adds parentheses at both ends of the array
function insert_edge_parentheses(array){
    internal_array = ["("]
    for (let i=0;i<array.length;i++){
        internal_array.push(array[i])
    }
    internal_array.push(")")
    return(internal_array)
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
function isArray(input){
    if(Array.isArray(input)){
        return(true)
    }
    else{
        return(false)
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
            if (isParentheses(char_previous) || char_previous == undefined){
                console.log("Parentheses before negative")
                compute_array[i+1] = subtractHelper(0, char_ahead)
            }
            else{
                compute_array[i+1] = subtractHelper(char_previous, char_ahead)
            }
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
            else{
                produceErrorMessage("Function deleteButton() found a weird case, unknown element deleted")
            }
        }
        
        //Deleting within global_screen_array (This assumes DEL is added to the array)
        // global_screen_array = pop_array(global_screen_array)
        
    }

    console.log(`Final global_screen_array after delete:`)
    console.log(global_screen_array)
}

let delete_button = alternate_buttons[6]
delete_button.addEventListener("click", () => {
    deleteButton()
})

function findParenthesesPairings(input_array){
    console.log(input_array)
    
    //Checks if comparisonNumber's number is found in any of the numbers stored in stack
    function isInStack(comparisonNumber, stack){
        for (let i=0;i<stack.length; i++){
            if (comparisonNumber == stack[i]){
                return(true)
            }
        }
        return(false)
    }
    //counting pairs
    let left_parentheses_count = 0
    for (let i=0; i< input_array.length; i++){
        char = input_array[i]
        if (char == "("){
            left_parentheses_count++
        }
    }
    console.log(`Left Parentheses Count = ${left_parentheses_count}`)
    
    let current_position1 = 0
    let current_position2 = 0
    final_stack = []
    // for (let j=0;j<left_parentheses_count;j++){
        for (let i=0;i< input_array.length; i++){
            let char = input_array[i]
            if (isInStack(i, final_stack)){
                //Do nothing
            }
            else{
                if(char == "("){
                    current_position1 = i
                }
                
                if(char == ")"){
                    current_position2 = i
                    break
                }

            }
        }
        final_stack.push(current_position1)
        final_stack.push(current_position2)
        console.log(final_stack)
    // }   
    
    console.log(`Stack looks like ${final_stack}`)
    return(final_stack)
    
}

//Adds a 'x" symbol when left and right parentheses are next to each other
function add_multiply_between_parentheses_in_array(array){
    console.log(`New array entering add multiply is ${array}`)
    //Edge case if array is 1 element long
    if (array.length == 1){
        return(array)
    }

    //Adding multiplcation symbol respectively
    let new_array = []
    for (let i=0;i<array.length;i++){
        if (i==0){
            char_previous = undefined
        }
        else{
            char_previous = array[i-1]
        }
        
        let char_current = array[i]

        if ((char_previous == ")") && (char_current == "(")){
            new_array.push("x")
            new_array.push(char_current)
        }
        else if(isNumber(char_previous) && (char_current == "(")){
            new_array.push("x")
            new_array.push(char_current)
        }
        else if((char_previous == ")") && (isNumber(char_current))){
            new_array.push("x")
            new_array.push(char_current)
        }
        else if(isNumber(char_previous) && (isNumber(char_current))){
            new_array.push("x")
            new_array.push(char_current)
        }
        else{
            new_array.push(char_current)
        }
    }
    return(new_array)
}

// console.log(`Testing fix array where`)
//Compute Function
function simpleCompute(compute_array){
    console.log(`simpleCompute array entering is ${compute_array}`)
    compute_array = computeMultiplicationDivision(compute_array)
    final_total = computeAdditionSubtraction(compute_array)
    console.log(`SimpleCompute calculated ${final_total}`)
    return(final_total)
}
function masterCompute(compute_array = 'Missing Input') {
    let temp_compute_array = compute_array
    let loop_length = 0
    for (let i=0;i<compute_array.length;i++){
        if (compute_array[i] == "("){
            loop_length++
        }
    }
    for (let i=0;i<loop_length;i++){
        let parentheses_pairing = findParenthesesPairings(temp_compute_array)
        console.log(`Parentheses_pairing is ${parentheses_pairing}`)
        let startSplice = parentheses_pairing[0]
        let endSplice = parentheses_pairing[1]
        temp_compute_array = spliceArray(temp_compute_array, startSplice, endSplice, simpleCompute(temp_compute_array.slice(startSplice + 1, endSplice)))
        console.log(`After slicing we got ${temp_compute_array}`)
        temp_compute_array = add_multiply_between_parentheses_in_array(temp_compute_array)
        console.log(temp_compute_array)
    }

    let final_output = simpleCompute(temp_compute_array)
    // let final_output 
    console.log(`Final output we find is ${final_output}`)
    return(final_output) //Last calculation
}

//Compute math of calculator screen. Instantiate equal button to compute
let equal_button = alternate_buttons[11]
equal_button.addEventListener("click", () => {
    checkForParenthesesIssue()
    checkForSymbolIssue()
    checkForRepeatingDecimal()
    // update_font_top()
    if (!checkForErrorMessage()){
        console.log(`Global Array is ${global_screen_array}`)
        console.log(global_screen_array)
        final_total = masterCompute(insert_edge_parentheses(global_screen_array)) //Input here should be global_screen_array

        calculator_screen_font_top.textContent = final_total
        global_screen_array = []
        global_intermediate_number = final_total
    }
    else{
        produceErrorMessage()
    }
    // purgeUndefined()
})

//--All Test Cases
// testArray = ["9", "+", "9"]
// testArray = ["(","9", "+", "9", ")"]
// testArray = ["(", "(","9", "+", "9", ")", ")"]
// testArray = ["(","(","9","+","5",")","+","7",")","(","7",")"]
// testArray = ["(","7",")","(","7",")"]
// testArray = ["7","(","7",")"]
// testArray = ["(","7",")","7"]
// testArray = ["4", "+", "(", "5", ")"]
// testArray = ["(","-","5",")"]

// simpleCompute(testArray)
// masterCompute(testArray)

// testArray = [9,"+", 9]
// console.log(testArray[5] == undefined)
// console.log(`Computing the test array of "(9+9)" we get ${masterCompute(testArray)}!`)
//check for error message
//breaks after first set of calculations (will not calculate with existing number on the screen)
//remove anything undefined within