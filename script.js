const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get DOM elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load previous answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load score from localStorage if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Listen for changes and save to sessionStorage
questionsElement.addEventListener("change", function (e) {
  if (e.target && e.target.type === "radio") {
    const questionIndex = e.target.name.split("-")[1];
    userAnswers[questionIndex] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Submit button logic
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] && userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
