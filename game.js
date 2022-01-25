var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red","blue","green","yellow"]
var started = false
var level = 0

$(document).keypress(function(){
  if(!started){
    $("#level-title").text(" Level 0");
    nextSequence()
      started = true

  }
})


$(".btn").on("click",function(){
  var useChosenColour = $(this).attr("id");
  userClickedPattern.push(useChosenColour);
  playSound(useChosenColour);
  animatePress(useChosenColour);
  checkAnswer(userClickedPattern.length-1)
//   console.log(userClickedPattern)

})

function nextSequence(){
   userClickedPattern = []
    level++;
  $("#level-title").text(" Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber]
gamePattern.push(randomChosenColour)
 $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour)
//   animatePress(randomChosenColour)
console.log(gamePattern)

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
    setTimeout(function(){
    $("."+currentColour).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {

    console.log("Success")
    if (userClickedPattern.length === gamePattern.length)
    {
//        setTimeout(nextSequence,500);
       setTimeout(function(){
         nextSequence();
       },1000)

    }


  }
  else
  {
     audio = new Audio("sounds/wrong.mp3");
     audio.play();
     $("body").addClass("game-over")
     setTimeout(function(){
       $("body").removeClass("game-over")
     },200)
     $("h1").text("Game Over, Press Any Key to Restart")
     startOver();

  }
}


function startOver()
{
  gamePattern = []
  userClickedPattern = []
  started = false
  level = 0
}
