const quizData = [
  {
    question: "1. What is the correct way to declare a variable in JavaScript?",
    options: ["var x = 5;", "let x = 5;", "const x = 5;", "int x = 5;"],
    answer: "let x = 5;",
  },
  {
    question:
      "2. Which of the following is a primitive data type in JavaScript?",
    options: ["Object", "Array", "String", "Function"],
    answer: "String",
  },
  {
    question: '3. What does the "DOM" stand for in JavaScript?',
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Ordinance Model",
      "Dynamic Ordinance Model",
    ],
    answer: "Document Object Model",
  },
  {
    question:
      "4. What is the purpose of the `addEventListener` method in JavaScript?",
    options: [
      "To add two numbers",
      "To attach an event handler to an element",
      "To create a new element",
      "To remove an element from the DOM",
    ],
    answer: "To attach an event handler to an element",
  },
  {
    question:
      '5. What is the output of the following code: `console.log(2 + "2");`?',
    options: ["4", "22", "TypeError", "undefined"],
    answer: "22",
  },
  {
    question: "6. In JavaScript, what is the role of the `===` operator?",
    options: [
      "Equality (loose)",
      "Equality (strict)",
      "Inequality (loose)",
      "Inequality (strict)",
    ],
    answer: "Equality (strict)",
  },
  {
    question: "7. Which keyword is used to define a function in JavaScript?",
    options: ["method", "function", "define", "class"],
    answer: "function",
  },
  {
    question:
      "8. What is the purpose of the `JSON.parse()` method in JavaScript?",
    options: [
      "To stringify an object",
      "To convert a JSON string to an object",
      "To parse HTML",
      "To encode a URL",
    ],
    answer: "To convert a JSON string to an object",
  },
  {
    question: "9. What does the `this` keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The global object",
      "The object that called the function",
      "The prototype object",
    ],
    answer: "The object that called the function",
  },
  {
    question:
      "10. Which loop is used for iterating over the properties of an object?",
    options: ["for loop", "while loop", "do-while loop", "for...in loop"],
    answer: "for...in loop",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = true;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
