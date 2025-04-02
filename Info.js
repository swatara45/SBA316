// Cache DOM elements
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const userLocation = document.getElementById('user-location');



// 2. BOM
let solution = "yes"; // Set the solution to "yes"
alert('Do you want to do a WNBA short quiz?');

// Allow the user 5 attempts to answer correctly
for (let i = 0; i < 2; i++) {
    let answer = prompt('Do you know much about Women Basketball? Yes or No');

    // Check if the user input matches the solution
    if (answer.toLowerCase() === solution) {
        alert('Go ahead and sign up');
        break; // Exit the loop if the user guesses correctly
    } else if (i < 4) {
        alert('Incorrect answer. Try again!'); // Show a retry message for incorrect answers
    } else {
        alert('You have used all attempts. Better luck next time!');
    }
}

// 3. HTML form validation using `required`, `minlength` etc. (HTML5-based validation)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission for now
    
    let isValid = true;

    // Clear any previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    // DOM-based validation (on form submission)
    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters.";
        isValid = false;
    }
    if (!emailInput.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters long.";
        isValid = false;
    }

    // If form is valid, save the data and show a success message
    if (isValid) {
        saveFormDataToLocalStorage();
        alert("Form submitted successfully!");

        // Optionally, clear the form after submission
        form.reset();
    }
});

// 4. DOM-based validation for each field (real-time as the user types)
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters.";
    } else {
        nameError.textContent = "";
    }
});

emailInput.addEventListener('input', () => {
    const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailInput.value.match(emailPattern)) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters long.";
    } else {
        messageError.textContent = "";
    }
});

