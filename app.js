//  Question Bank 
var questions = [
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which language runs inside a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "CSS is used for?",
        options: ["Logic", "Styling", "Database", "Server"],
        answer: "Styling"
    },
    {
        question: "Which tag creates a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<h1>"],
        answer: "<a>"
    },
    {
        question: "Which symbol starts a comment in CSS?",
        options: ["//", "<!-- -->", "/* */", "#"],
        answer: "/* */"
    },
    {
        question: "Which company originally developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Object Model", "Document Order Model", "Digital Object Model"],
        answer: "Document Object Model"
    },
    {
        question: "Which loop always runs at least once?",
        options: ["for", "while", "do...while", "foreach"],
        answer: "do...while"
    },
    {
        question: "Which JavaScript function converts a string to a number?",
        options: ["String()", "Number()", "toString()", "Boolean()"],
        answer: "Number()"
    }
];

var currentQuestion = 0;
var score = 0;
var questionCountEl = document.getElementById("question-count");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var nextBtn = document.getElementById("next-btn");
var quizBox = document.getElementById("quiz-box");
var resultBox = document.getElementById("result-box");
var finalScoreEl = document.getElementById("final-score");
var restartBtn = document.getElementById("restart-btn");
var themeBtn = document.getElementById("theme-btn");

//  Shuffle function like if the user refresh the page qustion will shuffle automatically  
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// current question + its options on screen
function loadQuestion() {
    var currentData = questions[currentQuestion];

    questionCountEl.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
    questionEl.textContent = currentData.question;

    optionsEl.innerHTML = "";

    for (var i = 0; i < currentData.options.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = currentData.options[i];
        btn.className = "option-btn";
        btn.onclick = function () {
            checkAnswer(this);
        };
        optionsEl.appendChild(btn);
    }

    nextBtn.style.display = "none";
}

// Runs when the user clicks an option button
function checkAnswer(selectedBtn) {
    var currentData = questions[currentQuestion];
    var allButtons = optionsEl.getElementsByTagName("button");

    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].onclick = null;

        if (allButtons[i].textContent === currentData.answer) {
            allButtons[i].classList.add("correct");
        }
    }

    if (selectedBtn.textContent === currentData.answer) {
        score = score + 1;
    } else {
        selectedBtn.classList.add("wrong");
    }

    nextBtn.style.display = "inline-block";
}

//  Next button moves to the next question
nextBtn.onclick = function () {
    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

//Show the final score
function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    finalScoreEl.textContent = "You scored " + score + " out of " + questions.length;
}

//  Restart button resets everything (and reshuffles too)
restartBtn.onclick = function () {
    currentQuestion = 0;
    score = 0;
    resultBox.style.display = "none";
    quizBox.style.display = "block";
    shuffleArray(questions);
    loadQuestion();
};

//  Dark/light toggle
themeBtn.onclick = function () {
    document.body.classList.toggle("dark");
};

//  Shuffle once, then start the quiz
shuffleArray(questions);
loadQuestion();