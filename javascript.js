//When a button is pressed, update the calculator
let calculator_screen_font_top = document.querySelector(".calculator_screen_font_top")
let calculator_screen_font_bot = document.querySelector(".calculator_screen_font_bot")

calculator_screen_font_top.textContent = ""
calculator_screen_font_bot.textContent = ""

let number_buttons = document.querySelectorAll(".number_button")
let number_buttons_array = []
// let number_button = document.querySelector(".number_button")

//Function to create a button for the numbers
function create_button(button) {
    button.addEventListener('click', () => {
        console.log(button.textContent)
    })
    return(button)
}

//Allows every number button to be interractable with a click
for (let i = 0; i < number_buttons.length; i++) {
    number_buttons_array.push(create_button(number_buttons[i]))
}

//All Alternate Buttons
let alternate_buttons = document.querySelectorAll(".alternate_button")
//Addition Button
let addition_button = alternate_buttons[12]
//Equal Button
let equal_button = alternate_buttons[11]

// console.log(number_button)


// document.getElementById("number_button").onclick = () => {
//     console.log("Button pressed")
// }
