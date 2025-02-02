var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false, clickBlocked = false;

$(document).keypress(function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    if (!gameStarted || clickBlocked) {
        return;
    }
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            clickBlocked = true;
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    gameStarted = false;
    clickBlocked = false;
}

function nextSequence() {
    clickBlocked = false;
    userPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $(`#${randomColor}`).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`). removeClass("pressed");
    }, 100);
}

function playSound(color) {
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}


