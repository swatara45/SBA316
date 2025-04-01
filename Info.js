// Cache DOM elements
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const userLocation = document.getElementById('user-location');

// 1. Use BOM Property: `localStorage` to store data on the user's browser
function saveFormDataToLocalStorage() {
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    // Save form data to localStorage
    window.localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
}

// 2. Use BOM Method: `navigator.geolocation` to get the user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            userLocation.innerHTML = `Your location: Latitude ${latitude}, Longitude ${longitude}`;
        });
    } else {
        userLocation.innerHTML = "Geolocation is not supported by this browser.";
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

// Call function to get the user's location
getUserLocation();