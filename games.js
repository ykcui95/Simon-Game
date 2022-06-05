$(document).ready(function() {
  // alert("ready");
});
// $("h1").css("color", "green");
var buttonColors = [
  "red",
  "blue",
  "green",
  "yellow"
]

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }

});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  animatedPress(userChosenColor);

  playsound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // SUCCESS
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  //WRONG
  else {
    // console.log("wrong");
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver()
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence () {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var randomChosedButton = $("#" + randomChosenColor);
  flash(randomChosedButton);

  playsound(randomChosenColor);

  userClickedPattern = [];
}

function animatedPress(currentColor) {
  var currentButton = $("#" + currentColor);
  currentButton.addClass("pressed");
  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 100);

}


function flash(btn) {
  btn.fadeIn(100).fadeOut(100).fadeIn(100);
}

function playsound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
