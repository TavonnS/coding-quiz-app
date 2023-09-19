var timeLeftEl = document.querySelector('#time-left');
var startScreenEl = document.querySelector('#start-screen');
var startBtnEl = document.querySelector('.start-btn');
var questionContainerEl = document.querySelector('#question-container');

var currentQuestionIndex = 0;
var timeLeft = 60;
var choicesEl = document.getElementById("choices-container");
var subBtn = document.getElementById("submit");


var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];


function startQuiz () {
  startScreenEl.setAttribute("class", "hide");
  questionContainerEl.removeAttribute("class");
  intervalId = setInterval(timeStart, 1000);
  renderCurrentQuestion();
}

function timeStart() {
  timeLeft--;
  timeLeftEl.textContent = "Time left: " + timeLeft + " seconds";
  if(timeLeft <= 0) {
    endQuiz();
  }
}

function renderCurrentQuestion() {
    
    var titleEl = document.getElementById("question-title");
    var currentQuestion = questions[currentQuestionIndex];
  
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    for (var i=0; i < currentQuestion.choices.length; i++) {
        var buttonEl = document.createElement('button');
        var choice = currentQuestion.choices[i];
        buttonEl.setAttribute("class", "choice");
        buttonEl.setAttribute("value", choice);
        buttonEl.textContent = questions[currentQuestionIndex].choices[i];
        choicesEl.appendChild(buttonEl);

    }
};

function userChoice (event) {
  var button = event.target;
  if (!button.matches(".choice")) {
    return;
  }

if (button.value !== questions[currentQuestionIndex].answer) {
  timeLeft -= 10;
}

currentQuestionIndex++;

if (currentQuestionIndex === questions.length) {
  endQuiz();
} else {
  renderCurrentQuestion();
}
}

function endQuiz() {
  clearInterval(intervalId);
  var endScreen = document.getElementById("high-score");
  questionContainerEl.setAttribute("class", "hide");
  endScreen.removeAttribute("class");
  
  var scoreEl = document.getElementById("final-score");
  scoreEl.textContent = timeLeft; 
}

startBtnEl.addEventListener("click", startQuiz);
startBtnEl.addEventListener("click", function() {
  startBtnEl.style.display = "none"
});
questionContainerEl.addEventListener("click", userChoice)

var hsArr = [];
var hsInputs = document.getElementById("submit");
var inArr = [];

function hsGen(event) {
  event.preventDefault();
  const input = document.getElementById("initials").value;
  hsArr.push(input);
  document.getElementById('initials').value = '';
  var scoreEl = document.getElementById("final-score").textContent;
  inArr.push(scoreEl);
  var final = document.getElementById("final-screen");
  final.innerHTML = hsArr + ": " + inArr;
  var hsLog = final.innerHTML; 
  hsInputs.removeEventListener("click", hsGen);

  var restart = document.createElement("button");
  restart.textContent = "Restart Quiz"
  var seeHS = document.createElement("button"); 
  seeHS.textContent = "See High Scores"



  var fDiv = document.getElementById("final-screen");
  fDiv.appendChild(restart);
  fDiv.appendChild(seeHS);
 
  restart.addEventListener("click", function(event){
    event.preventDefault;
    location.reload();
  });

  seeHS.addEventListener("click", function(event){
    event.preventDefault;
    var hsScreen = document.getElementById("hs-screen")
    hsScreen.innerHTML = hsLog; 
  });
}

hsInputs.addEventListener("click", hsGen);


