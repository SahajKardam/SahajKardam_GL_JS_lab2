
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
  if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function loadQuestions() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionByIndex().text;

       var choices = quiz.getQuestionByIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          handleOptionButton("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// Questions asked
var questions = [
  new Question("JavaScript was invented by", ["Brendan Eich", "James Goshling","Guido van Rossum", "Tim Berners-Lee"], "Brendan Eich"),
  new Question("JavaScript is used for", ["develop desktop application", "develop games", "develop web pages", "develop database"], "develop web pages"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
  new Question("What is the purpose of the typeof operator in JavaScript?", ["To determine the data type of a value", "To convert a value to a specific data type", "To compare two values for equality", "To declare a new variable"], "To determine the data type of a value"),
  new Question("What is the purpose of the map() method in JavaScript arrays?", ["To add a new element to the end of an array", "To remove an element from an array", "To modify each element of an array and create a new array", "To sort the elements of an array in ascending order"], "To modify each element of an array and create a new array")

];

var quiz = new Quiz(questions);

loadQuestions();