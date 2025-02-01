document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("playAgainBtn").addEventListener("click", startQuiz);
document.getElementById("restartBtn").addEventListener("click", restartQuiz);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        localStorage.setItem(username, password);
        document.getElementById("message").textContent = "Registered successfully! Please log in.";
    } else {
        document.getElementById("message").textContent = "Enter a valid username and password.";
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (localStorage.getItem(username) === password) {
        localStorage.setItem("loggedInUser", username);
        showQuiz();
    } else {
        document.getElementById("message").textContent = "Invalid username or password.";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function showQuiz() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    document.getElementById("welcomeMessage").textContent = `Welcome, ${loggedInUser}!`;
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("quizContainer").classList.remove("hidden");
    startQuiz();
}

if (localStorage.getItem("loggedInUser")) {
    showQuiz();
}

const quizData = [
    { question: "What is the Capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which one of these is the Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "What is the Symbol for Oxygen?", options: ["O", "H", "O2", "C"], answer: "O" },
    { question: "How many Continents?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Who is the Author of 'Romeo & Juliet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare" },
    { question: "Which is the Hardest substance?", options: ["Gold", "Diamond", "Iron", "Platinum"], answer: "Diamond" },
    { question: "What is the Speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^7 m/s", "3x10^9 m/s"], answer: "3x10^8 m/s" },
    { question: "Which Country is called Land of the Rising Sun?", options: ["China", "India", "Japan", "South Korea"], answer: "Japan" },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("resultContainer").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = q.question;
    document.getElementById("choices").innerHTML = q.options.map((opt, i) =>
        `<div class="option" onclick="selectOption(${i})">
            <input type="radio" name="answer" value="${opt}" id="opt${i}">
            <label for="opt${i}">${opt}</label>
        </div>`
    ).join("");
}

function selectOption(index) {
    document.getElementById(`opt${index}`).checked = true;
    document.getElementById('nextBtn').classList.remove('hidden');
}

function nextQuestion() {
    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (selected.value === quizData[currentQuestionIndex].answer) {
        score++;  // ✅ Correct answer, increase score
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        document.getElementById("nextBtn").classList.add("hidden");
        showQuestion();
    } else {
        document.getElementById("quizContainer").classList.add("hidden");
        document.getElementById("resultContainer").classList.remove("hidden");
        document.getElementById("finalScore").textContent = `Your score: ${score}/${quizData.length}`;
        document.getElementById("playAgainBtn").classList.remove("hidden");
    }
}


function restartQuiz() {
    startQuiz();
}
