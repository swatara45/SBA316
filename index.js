// Cache elements using getElementById
let nextBtn = document.getElementById("next-btn");
let restartBtn = document.getElementById("restart-btn");
let scoreDisplay = document.getElementById("score");
let resultContainer = document.getElementById("result");
let questionEl = document.querySelector("#question");
let choicesEl = document.querySelector("#choices");
const questions = [
    {
        question: "Who was the first woman to dunk in a WNBA game?",
        choices: ["Lisa Leslie", "Diana Taurasi", "Tamika Catchings", "Sheryl Swoopes"],
        answer: "Lisa Leslie"
    },
    {
        question: "Which team won the first WNBA championship in 1997?",
        choices: ["New York Liberty", "Houston Comets", "Los Angeles Sparks", "Phoenix Mercury"],
        answer: "Houston Comets"
    },
    {
        question: "Who is the all-time leading scorer in WNBA history?",
        choices: ["Tamika Catchings", "Diana Taurasi", "Sue Bird", "Lisa Leslie"],
        answer: "Diana Taurasi"
    },
    {
        question: "Which WNBA player has the most MVP awards?",
        choices: ["Lisa Leslie", "Tamika Catchings", "Sheryl Swoopes", "Diana Taurasi"],
        answer: "Lisa Leslie"
    },
    {
        question: "What year was the WNBA founded?",
        choices: ["1991", "1995", "1997", "2000"],
        answer: "1997"
    },
    {
        question: "Which player was nicknamed “The Queen” of the WNBA?",
        choices: ["Tamika Catchings", "Lisa Leslie", "Diana Taurasi", "Cheryl Miller"],
        answer: "Cheryl Miller"
    }
];

// Track score and current question index
let currentQuestionIndex = 0;
let score = 0;

// 1. Create an element using createElement and add event listeners
function createAnswerItem(choice) {
    const li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice-item"); // Adding class to style

    // 3. Modify the style or class of the element
    li.addEventListener("mouseover", () => {
        li.style.backgroundColor = "lightblue"; // Change background on hover
    });

    li.addEventListener("mouseout", () => {
        li.style.backgroundColor = ""; // Reset background
    });

    li.addEventListener("click", () => {
        checkAnswer(choice); // Check answer when clicked
        li.style.backgroundColor = choice === questions[currentQuestionIndex].answer ? "green" : "red"; // Highlight correct/incorrect answer
    });

    return li;
}

// 2. Use DocumentFragment to improve performance (batch DOM changes)
function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    // Create a DocumentFragment to store elements before appending to the DOM
    let fragment = document.createDocumentFragment();

    currentQuestion.choices.forEach(choice => {
        let answerItem = createAnswerItem(choice);
        fragment.appendChild(answerItem); // Append each item to the fragment
    });

    // Append all answer items to the DOM at once
    choicesEl.innerHTML = ''; // Clear previous choices
    choicesEl.appendChild(fragment);
}

// 3. Modify HTML content in response to user interaction using innerHTML or innerText
function checkAnswer(selectedChoice) {
    let currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;

    // Show next question or result
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 4. Modify the style or CSS class in response to interaction using classList
function showResult() {
    resultContainer.style.display = "block";
    scoreDisplay.innerText = `Your final score: ${score}`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";
}

// 5. Modify attributes (e.g., the restart button's display property)
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    nextBtn.style.display = "block";
    restartBtn.style.display = "none";
    showQuestion();
});

// 6. Register event listeners for the next button
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0) {
        showQuestion(); // Start quiz on the first click
    }
});

startQuiz();

// Start the quiz initially
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}