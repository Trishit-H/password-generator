// DOM Elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');


// ALL Generator functions
const generatorFunctions = {
    lower: generateRandomLowercaseLetters,
    upper: generateRandomUppercaseLetters,
    numbers: generateRandomDigits,
    symbols: generateRandomSymbols
}

// add event listeners
generateElement.addEventListener('click', () => {
    const length = +lengthElement.value; //added + to convert from string to number
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumbers = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    resultElement.innerHTML = generatePassword(length, hasLower, hasUpper, hasNumbers, hasSymbols)
});

clipboardElement.addEventListener('click', () => {
    copyPassword(resultElement.innerHTML);
})

// function to generate password
function generatePassword(length, lower, upper, numbers, symbols) {
    let generatedPassword = '';

    // count how many settings are checked
    const settingsCount = lower + upper + numbers + symbols;

    // make an array of all the checked setting only
    const settingsCheckedArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(item => Object.values(item)[0]);

    // check if no settings are selected
    if (settingsCount === 0) {
        alert('Please select at least one setting to generate a password!')
        return '';
    }

    // check if value of length is zero
    if (length < 6 || length > 20) {
        alert('Password length must be between 6 to 20!')
        return '';
    }

    for (let i = 0; i < length; i += settingsCount) {
        settingsCheckedArr.forEach(setting => {
            const funcName = Object.keys(setting)[0];

            generatedPassword += generatorFunctions[funcName]();
        })
    }

    return generatedPassword.slice(0, length);
};

// function to copy password to clipboard
async function copyPassword(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('Password copied to clipboard!')
    } catch (err) {
        alert('Cannout copy password');
        console.log('Error at copyPassword function:', err);
    }
}

// ASCII VALUES - https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html

// Generator functions

// 1. function that generates random number between a given range(inclusive)
function generateRandomNumber(min, max) {
    min = Math.ceil(min); // makes sure the min number is rounded up
    max = Math.floor(max); // makes sure the max number is rounded down
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2. function to generate random lowercase letters
// lowercase ASCII values - 97 to 122
function generateRandomLowercaseLetters() {
    const asciiCode = generateRandomNumber(97, 122);
    return String.fromCharCode(asciiCode);
}

// 3. function to generate random uppercase letters
// uppercase ASCII values - 65 to 90
function generateRandomUppercaseLetters() {
    const asciiCode = generateRandomNumber(65, 90);
    return String.fromCharCode(asciiCode);
}

// 4. function to generate random numbers
// uppercase ASCII values - 48 to 57
function generateRandomDigits() {
    const asciiCode = generateRandomNumber(48, 57);
    return String.fromCharCode(asciiCode);
}

// 5. function to generate random symbols
function generateRandomSymbols() {
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    const symbolsArr = symbols.split('');
    return symbolsArr[Math.floor(Math.random() * symbolsArr.length)]
}