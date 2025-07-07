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
        // console.log(button.textContent) //This is not necessary delete later
        update_font_top(button.textContent)
    })
    return(button)
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

//Addition Button
let addition_button = alternate_buttons[12]
//Equal Button
//I know there are math libraries out there, but I am building from scratch

function add(input_array){
    let output = 0
    for (let i=0; i < input_array.length; i++) {
        output += input_array[i]
    }
    return output
}

function compressArray(input_array){
    let output_string = ""
    for (let i = 0; i < input_array.length; i ++) {
        output_string += input_array[i].toString()
    }
    return(output_string)
}

function isNumber(input) {
    compare_array = []
    for (let i=0; i<= 9; i++) {
        if (input == i) {
            return (true)
        }
    }
    return false
}
//Clear (CE) Button
function clearButton(){
    calculator_screen_font_top.textContent = ""
}
let clear_button = alternate_buttons[4]
clear_button.addEventListener("click", () => {
    clearButton()
})

//Delete (DEL) Button
//    --Helper Function
function popFunction(array){
    new_array = []
    if (array.length > 0) {
        for (let i = 0; i < array.length - 1; i++){
            new_array.push(array[i])
        }
    }
    return compressArray(new_array)
}

console.log(popFunction("Hellow"))

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
    //Goes through calculator screen and creates array separating numbers from alternate numbers
    for (let i = 0; i < calculator_screen_font_top.textContent.length; i++) {
        if (isNumber(calculator_screen_font_top.textContent[i])) {
            current_number_array.push(calculator_screen_font_top.textContent[i])
        }
        else {
            current_number = compressArray(current_number_array)
            compute_array.push(current_number)
            compute_array.push(calculator_screen_font_top.textContent[i])
            current_number_array = []
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
