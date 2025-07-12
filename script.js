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

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load saved answers (sessionStorage)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score (localStorage)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render Questions & Answers
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.style.marginBottom = "15px";

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore checked state from sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save selection to sessionStorage on change
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      label.style.display = "block";
      questionElement.appendChild(label);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Submit Quiz and Calculate Score
function submitQuiz() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const selected = userAnswers[i];
    if (selected && selected === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

submitBtn.addEventListener("click", submitQuiz);

renderQuestions();
