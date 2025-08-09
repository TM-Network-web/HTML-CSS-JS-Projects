
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answerContainer = document.getElementById("answers-container");
const progressBar = document.getElementById('progress');
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const resultMessage = document.getElementById('result-message');


const quizQuestions = [
  {
    question: "What is the capital of Pakistan : ",
    answer:
      [
        { text: "Lahore", correct: false },
        { text: "Karachi", correct: false },
        { text: "Islamabad", correct: true },
        { text: "Multan", correct: false }
      ],
  },
  {
    question: "Mostly Speaking Language in the world : ",
    answer:
      [
        { text: "English", correct: true },
        { text: "Chinese", correct: false },
        { text: "Urdu", correct: false },
        { text: "Dutch", correct: false }
      ],
  },

  {
    question: "Which color feels like a fire : ",
    answer:
      [
        { text: "Blue", correct: false },
        { text: "Pink", correct: false },
        { text: "Green", correct: false },
        { text: "Yellow", correct: true }
      ],
  },

  {
    question: "Which language is used in frontend of websites : ",
    answer:
      [
        { text: "C++", correct: false },
        { text: "Javascript", correct: true },
        { text: "Python", correct: false },
        { text: "Go", correct: false }
      ],
  },
  {
    question: "which one is the Fruit  : ",
    answer:
      [
        { text: "Tomatto", correct: false },
        { text: "Onion", correct: false },
        { text: "Carrot", correct: false },
        { text: "None of the above", correct: true }
      ],
  }
]

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;
    totalQuestionSpan.textContent = quizQuestions.length;


startBtn.addEventListener("click",startQuiz);
restartBtn.addEventListener("click",restartQuiz);


function startQuiz(){
   currentQuestionIndex = 0;
   scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}

function showQuestions(){

  answerDisabled = false;
  let currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent =  currentQuestionIndex+1;

  questionText.textContent = currentQuestion.question;

  const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;

  progressBar.style.width = progressPercent +"%";

  answerContainer.innerHTML = "";

  currentQuestion.answer.forEach(answer=>{
    let button = document.createElement("button")
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    answerContainer.appendChild(button);

    button.addEventListener("click", selectAnswer);
  });
}


function selectAnswer(event){
  if(answerDisabled) return

  let selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "true";
  
  Array.from(answerContainer.children).forEach(button=>{
    const correct = button.dataset.correct==="true";
    button.classList.add(correct?"correct":"incorrect")
  });

  if(isCorrect){
    score++;
    scoreSpan.textContent = score; 
  }

  setTimeout(()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex< quizQuestions.length){
      showQuestions();
    }else{
      showResults();
    }
  },500)
}


function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;
  maxScore.textContent = quizQuestions.length;

  const percentage = (score / quizQuestions.length)*100;
  
  if(percentage === 100){
    resultMessage.textContent = "Perfect! You are genius Guy";
  }
  else if(percentage>=80){
        resultMessage.textContent = "Excellent! You are Doing a Great Job!";
  }  else if(percentage>=60){
        resultMessage.textContent = "Good! But you keep more Effort.";
  }  else if(percentage<60){
        resultMessage.textContent = "Put More and More Efforts";
  }

else if(percentage===0){
  resultMessage.textContent = "You are very weak student keep try next time for better Luck."
}
}


function restartQuiz(){
  resultScreen.classList.remove("active");
  startQuiz();
}