/* All answer options */
const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

/* All our options */
const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question"); //the question

const numberOfQuestion = document.getElementById("number-of-question"),
  numberOfAllQuestions = document.getElementById("number-of-all-questions"); //number of the question

let indexOfQuestion, //index of the current question
  indexOfPage = 0; //index of the page

const answersTracker = document.getElementById("answers-tracker"); //wrapper for tracker
const btnNext = document.getElementById("btn-next"); // button Next

let score = 0; //total score of the quiz

const correctAnswer = document.getElementById("correct-answer"), //number of correct answers
  numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"), //number of all questions in modal
  btnTryAgain = document.getElementById("btn-try-again"); //button Try the quiz again

const questions = [
  {
    question: "How many oscars did the Titanic movie got?",
    options: ["11", "0", "13", "26"],
    rightAnswer: 0,
  },
  {
    question: "What is the house number of the Simpsons?",
    options: ["Number 1742", "Number 742", "Number 35", "Number 0"],
    rightAnswer: 1,
  },
  {
    question: 'Who played Che Guevara in the movie "Evita?"',
    options: [
      "Arnold Schwarzenegger",
      "Al Pacino",
      "Woody Allen",
      "Antonio Banderas",
    ],
    rightAnswer: 3,
  },
];

numberOfAllQuestions.innerHTML = questions.length; // rendering a number of questions

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; //the question

  //mapping of answers

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //setting a number of the current page

  indexOfPage++; //increasing of page index
};

let completedAnswers = []; //array for asked questions

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; //anchor to check if the questions are the same

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

//removal of all classes for all answers
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("You should pick up a variant from answers");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

btnNext.addEventListener("click", () => {
  validate();
});

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", () => {
  tryAgain();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};
const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};
