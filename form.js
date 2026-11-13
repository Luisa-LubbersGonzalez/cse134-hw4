const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const commentsInput = document.querySelector("#comments");
const fields = [nameInput, emailInput, commentsInput];

const errorArea = document.querySelector("#error-area");
const noErrorsMessage = document.querySelector("#no-errors");
const infoArea = document.querySelector("#info-area");
const charCount = document.querySelector("#char-count");
const charWarning = document.querySelector("#char-warning");
const formErrorsInput = document.querySelector("#form-errors");

const fieldNames = {
    name: "Name",
    email: "Email",
    comments: "Comments"
};

// Create array to record validation errors encountered 
const form_errors = [];

// Show the message errors area
errorArea.hidden = false;
infoArea.hidden = false;

// Customizing built-in validation messages
function getErrorMessage(field) {
    const fieldName = fieldNames[field.id];
    if (field.validity.valueMissing) {
        return fieldName + " is required. Please fill it in.";
    }
    if (field.validity.typeMismatch) {
        return fieldName + " must be a full address, like user@example.com";
    }
    if (field.validity.tooShort) {
        return fieldName + " is too short. Please use at least " + field.minLength + " characters (you have " + field.value.length + ").";
    }
    return "";
}

function checkField(field, showMessage) {
    // Clear custom validity messages with setCustomValidity("") when rechecking
    field.setCustomValidity("");
    const message = getErrorMessage(field);
    // Inspect each field's validity state and using setCustomValidity() to set a custom error message if the field is invalid. If the field is valid, setCustomValidity() to provide specific guidance
    field.setCustomValidity(message);
    const errorItem = document.querySelector("#" + field.id + "-error");

    if (message === "") {
        errorItem.textContent = "";
        errorItem.hidden = true;
    } else if (showMessage || !errorItem.hidden) {
        errorItem.textContent = message;
        errorItem.hidden = false;
    }
    updateNoErrorsMessage();
    return message;
}

// Show or hide the no errors message 
function updateNoErrorsMessage() {
    let anyErrors = false;
    fields.forEach(function (field) {
        const errorItem = document.querySelector("#" + field.id + "-error");
        if (!errorItem.hidden) {
            anyErrors = true;
        }
    });
    noErrorsMessage.hidden = anyErrors;
}

fields.forEach(function (field) {
    // add event listener to see when a user is editing the fields and update message
    field.addEventListener("input", function() {
        field.dataset.edited = "true";
        checkField(field, false);
    });
    
    // add event listener to see when a user leaves the field and update message
    field.addEventListener("blur", function() {
        if (field.dataset.edited === "true") {
            checkField(field, true);
        }
    });

    // add event listener for validation error encountered to array
    field.addEventListener("invalid", function(event) {
        const message = checkField(field, true);
        form_errors.push({
            field: field.id,
            error: messsage,
            time: new Date().toISOString()
        });
    });
});

fields.forEach(function (field) {
    checkField(field, false);
});

const warningThreshold = 100;

// Display the number of chars remaining in the comments field
function updateCharCount() {
    const limit = commentsField.maxLength;
    const remaining = limit - commentsField.value.length;

    charCount.textContent = remaining + " of " + limit + " characters remaining.";

    if (remaining == 0) {
        charWarning.textContent = "You have reached the maximum number of characters.";
        charWarning.className = "at-limit";
    } else if (remaining <= warningThreshold) {
        charWarning.textContent = "You are approaching the maximum number of characters.";
        charWarning.className = "warning";
    } else {
        charWarning.textContent = "";
        charWarning.className = "";
    }
}

// update on input change to the comments field and on page load
commentsField.addEventListener("input", updateCharCount);
updateCharCount();

//Serialize the array and place it in hidden field
form.addEventListener("submit", function() {
    formErrorInputs.value = JSON.stringify(form_errors);
});