// Creating arrays for diff character sets - specials, numbers, upper case, lower case


var specCharsArray = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "[", "]", "|", "?", "/", "<", ",", ">", "."];
var numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var upperCaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Function that has several prompt to the user requesting desired criteria for password
function userOptionsFunc() {

    pwLength = window.prompt("How many characters would you like the password to be?");

    // Confirm that password is between 8 and 128 chars, otherwise give an error message pop up
    if (pwLength < 8 || pwLength > 128) {
        window.alert("Your password must be between 8 and 128 characters. Try again.");
        lengthCheckOk = false;
        return null;
    } else {
        lengthCheckOk = true;
    };
    // Variables created to store the user input about chracters wanted in password
    specCharsBool = window.confirm("Would you like to include special characters?")
    numCharsBool = window.confirm("Would you like to include numeric characters?");
    upperCaseBool = window.confirm("Would you like to include uppercase characters?");
    lowerCaseBool = window.confirm("Would you like to include lowercase characters?");

    // userInput object stores the user's input into a single object
    userInput = {
        length: pwLength,
        specials: specCharsBool,
        numbers: numCharsBool,
        uppers: upperCaseBool,
        lowers: lowerCaseBool
    };

    // New add - If condition, to make sure at least one type of character set is chosen, if not return and end function
    if (!specCharsBool && !numCharsBool && !upperCaseBool && !lowerCaseBool) {
        window.alert("You must choose at least one type of character to include in the password. Try again.");
        checkCharClasses = false;
        return null;
    } else {
        checkCharClasses = true;
    };

    console.log(userInput);
    return userInput;
};



// generatePassword function (referenced in provided code) - function that will create a string based on user input criteria from userOptionsFunc
function generatePassword() {
// Command to run userOptionsFunc when this generatePassword function runs (resulting from button press)
    var userObject = userOptionsFunc();
//this line is to prevent the generatePassword function from posting a new password IF the userOptionsFunc returned null
    if (userObject === null) {
        return null;
    };
//Creating empty arrays to store possible characters for pw, required characters based on classes, and password result array
    var allPossibleCharsArray = [];
    var requiredCharArray = [];
    var finalPasswordArray = [];

//IF statement - if special chars are chosen by user, then add special chars into possibleCharsArray AND insert a random special char into the requiredChars array
    if (userInput["specials"] === true) {
        allPossibleCharsArray = allPossibleCharsArray.concat(specCharsArray);
        requiredCharArray = requiredCharArray.concat(specCharsArray[Math.floor(Math.random() * specCharsArray.length)]);
    }
 // Similar IF statement but for numbers
    if (userInput["numbers"] === true) {
        allPossibleCharsArray = allPossibleCharsArray.concat(numArray);
        requiredCharArray = requiredCharArray.concat(numArray[Math.floor(Math.random() * numArray.length)]);
    }
// IF statement for upper case letters
    if (userInput["uppers"] === true) {
        allPossibleCharsArray = allPossibleCharsArray.concat(upperCaseArray);
        requiredCharArray = requiredCharArray.concat(upperCaseArray[Math.floor(Math.random() * upperCaseArray.length)]);
    }
// IF statement for lower case letters
    if (userInput["lowers"] === true) {
        allPossibleCharsArray = allPossibleCharsArray.concat(lowerCaseArray);
        requiredCharArray = requiredCharArray.concat(lowerCaseArray[Math.floor(Math.random() * lowerCaseArray.length)]);
    }

    // for loop to add characters randomly from the allPossibleCharsArray into the finalPasswordArray
    for (i = 0; i < userInput["length"]; i++) {
        finalPasswordArray = finalPasswordArray.concat(allPossibleCharsArray[Math.floor(Math.random() * allPossibleCharsArray.length)]);
    };

    // similar for loop here, except add characters from the requiredCharArray into the finalPasswordArray, replacing the first characters in finalPasswordArray
    for (i = 0; i < requiredCharArray.length; i++) {
        finalPasswordArray.splice(i, 1, requiredCharArray[i]);
    };
    // convert from array to a string, and remove the commas from the password
    finalPasswordString = finalPasswordArray.join('');
    // deliver the final, string password
    return finalPasswordString;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
