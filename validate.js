const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 10;
const MIN_PASS_LENGTH = 6;
const OK = {code: 1, message: "Данните са изпратени успешно."};
const INVALID_USER = {code: 2, message: "Потребителското име трябва да е между 3 и 10 символа и да съдържа само малки и големи букви, цифри и _."};
const INVALID_PASS = {code: 3, message: "Паролата трябва да е най-малко 6 символа и да съдържа поне една голяма, една малка буква и една цифра."};
const INVALID_REPEAT = {code: 4, message: "Паролите не съвпадат."};

/* ------------ Validating input -------------- */

const validate = (input) => {
    if (!isValidUsername(input.username)) {
        return INVALID_USER.code;
    }

    if (!isValidPassword(input.password)) {
        return INVALID_PASS.code;
    }
    if (!isSamePassword(input.password, input.repeatedPassword)) {
        return INVALID_REPEAT.code;
    }

    return OK.code;
}

const isValidUsername = (username) => {
    let usernameRegex = new RegExp("^[A-z0-9_]+$");
     return MIN_USERNAME_LENGTH <= username.length && username.length <= MAX_USERNAME_LENGTH 
            && usernameRegex.test(username);
}

const isValidPassword = (password) => {
    let uppercase = new RegExp("[A-Z]+");
    let lowercase = new RegExp("[a-z]+");
    let digits = new RegExp("[0-9]+");
    return MIN_PASS_LENGTH <= password.length && uppercase.test(password) && lowercase.test(password) && digits.test(password);
}

const isSamePassword = (password, repeatedPassword) => {
    return password === repeatedPassword;
}

/* ------------- Displaying messages to the user ----------*/

const addMessageElem = () =>{
    let messageElem = document.createElement("div");
    messageElem.setAttribute("id", "message");
    messageElem.appendChild(document.createTextNode(""));
    document.body.appendChild(messageElem);
}

const getMessage = (message) => {
    document.getElementById("message").innerHTML = message;
}

const displayMessage = (code) => {
    if (code === INVALID_USER.code) {
        getMessage(INVALID_USER.message);
    } else if (code === INVALID_PASS.code) {
        getMessage(INVALID_PASS.message);
    } else if (code === INVALID_REPEAT.code) {
        getMessage(INVALID_REPEAT.message);
    } else {
        getMessage(OK.message);
    }
}

/* -------------- Getting input from registration form ------------- */

const getInput = (form) => {
    let fields = {};

    fields.username = form[0].value;
    fields.password = form[1].value;
    fields.repeatedPassword = form[2].value;

    return fields;
}

/* ------------ Sending an AJAX request with the input to the server ---------- */

function sendToServer(url, sendMethod, data) {
    let request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status == 200) {
            displayServerResponse();
        } 
    };
    
    request.open(sendMethod, url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
}

/* ------------ Submit handler ---------------- */

const submitHandler = event => {
    event.preventDefault();

    let input = getInput(document.getElementById("reg-form"));
    addMessageElem();

    let isValid = validate(input);
    if (isValid === OK.code) {
        sendToServer("register.php", "POST", input);
    } 

    displayMessage(isValid);
}


window.addEventListener("load", ()=> {
    document.getElementById("reg-form").addEventListener("submit", submitHandler);
});
