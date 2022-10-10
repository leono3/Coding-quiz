var timeEl = document.querySelector(".time");
var question = $(".question");
var startButton = $("#button");
var buttons = $(".buttons");
var answers = $(".answers");
var options = ["A",'B','C',"D"];
var i = 0;
var result = $(".result");
var questionResult = $('<p>');
    questionResult.text("");
    result.append(questionResult);
var secondsLeft = 20;
var score = 0;
var userName = $(".userName");
document.querySelector(".userName").style.display = "none";
document.querySelector(".scoreBoard").style.display = "none";
var quizScore = {user: "", points: ""};
var nameInput = $("<input type= 'text'>");
nameInput.attr("placeholder", "Input your initials")
var sb = $(".scoreBoard");
var quit = false;
var quizScoreSave;
var inputVal;


startButton.on("click", function () {
    timeEl.textContent = secondsLeft + " seconds left";
    setTime();
    question.text(questionSet[i].question);
       for (var ii = 0; ii < options.length; ii++) {
            var answerBtn = $('<button>');
            if (ii === 0){
                answerBtn.attr('choice', "A");
            }
            if (ii === 1){
                answerBtn.attr('choice', "B" );
            }
            if (ii === 2){
                answerBtn.attr('choice', "C" );
            }
            if (ii === 3){
                answerBtn.attr('choice', "D" );
            }
            // // Display the letter
            answerBtn.addClass("answerButton");
            answerBtn.text(options[ii] + ") " + questionSet[i].choices[ii]);
            // Attach the letter element
            answers.append(answerBtn);
            //UPGRADE: use column in css [done]
    document.getElementById("button").style.display = "none";    
    //   }
    
   }});

// console.log($('.choice A').text());
answers.on("click", function(event) {
    if($(event.target).attr('choice') === questionSet[i].answer) {
        console.log($(event.target).attr('choice'))
        questionResult.text("TRUE");
        score += 1;
    }
    else {
        questionResult.text("FALSE");
        secondsLeft -= 5;
    }
    i = i+1;
    console.log(i);
    if (i < questionSet.length){
        question.text(questionSet[i].question);
       for (var ii = 0; ii < options.length; ii++) {
                var choice = answers.children()[ii];
                //Why can I not use $(".choice A")??
                choice.textContent = (options[ii] + ") " + questionSet[i].choices[ii]);
       }
    }
    else {
        quizOver();
    }
    
    
    
});

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left";
      if (quit === false) {
        if(secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            quizOver();
          }    
      }
      else {
        clearInterval(timerInterval);
        secondsLeft = 1;
      }
      
    }, 1000);
  }

  function quizOver() {
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".buttons").style.display = "none"; 
    timeEl.textContent = "";
    question.text("All Done!");
    document.querySelector(".answers").style.display = "none";
    questionResult.text(`Your final score is ${score}.`);;
    document.querySelector(".userName").style.display = "block";
  }

// userName.on("click", function() {
//     document.querySelector(".userName").style.display = "block";
// })

function getInputValue(){
    // Selecting the input element and get its value 
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".question").style.display = "none";
    document.querySelector(".userName").style.display = "none";
    document.querySelector(".result").style.display = "none";  
    document.querySelector(".buttons").style.display = "none"; 
    inputVal = document.getElementById("initials").value;
    quizScore.user = inputVal;
    quizScore.points = score;
    quizScoreSave = JSON.stringify(quizScore);
    
    var lastHighscore = localStorage.getItem("quizScoreSaved");
    //console.log(JSON.parse(lastHighscore));
    if (lastHighscore) {
        lastScore = JSON.parse(localStorage.getItem("quizScoreSaved")).points;
        if (score >= lastScore) {
            setNewHS();
        }
        else {
            displayHS();  
        }
    }
    else {
        setNewHS()  
        }
    //leaderboard still needs work
    //clean up getInputValue function, can store object to local storage using JSON.stringify() DONE!

}

function checkHighScore() {
    quit = true;
    setTime();
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".time").style.display = "none";
    document.querySelector(".question").style.display = "none"; 
    document.querySelector(".result").style.display = "none"; 
    document.querySelector(".buttons").style.display = "none"; 
    document.querySelector(".answers").style.display = "none"; 
    document.querySelector(".userName").style.display = "none"; 
    var lastHighscore = localStorage.getItem("quizScoreSaved");
    if (lastHighscore) {
        displayHS()
    }
    else {
        var noHS = $("<p>");
        noHS.text("No Scores Saved");
        noHS.addClass("displayB")
        sb.append(noHS);
        document.querySelector(".scoreBoard").style.display = "block";
        resetMenu();
    }
}

function displayHS() {
    var sbName = $("<p>");
    sbName.addClass("sb");
    inputVal = (JSON.parse(localStorage.getItem("quizScoreSaved")).user);
    score = JSON.parse(localStorage.getItem("quizScoreSaved")).points;
    console.log(score);
    var sbName = $("<p>");
    sbName.addClass("sb");
    sbName.text(inputVal + " - " + score);
    sb.append(sbName);
    resetMenu()
    document.querySelector(".scoreBoard").style.display = "block";    
    }

function resetMenu() {
    var restart = $("<button>");
    restart.addClass("reset");
    restart.text("Restart Quiz");
    restart.on("click", function() {
        location.reload();
    })
    var clear = $("<button>");
    clear.addClass("reset");
    clear.text("Clear Highscores");
    clear.on("click", function() {
        localStorage.clear();
        document.querySelector(".sb").style.display = "none";
    })
    sb.append(restart);
    sb.append(clear);
}

function setNewHS()  {
    localStorage.setItem("quizScoreSaved", quizScoreSave);
    var sbName = $("<p>");
    sbName.addClass("sb");
    sbName.text(inputVal + " - " + score);
    sb.append(sbName);
    resetMenu();
    document.querySelector(".scoreBoard").style.display = "block";
}