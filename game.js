var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];

var start=false;
var level=0;

$(document).keypress(function(){
  if(!start)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    start=true;
  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currlevel)
{
  if(userClickedPattern[currlevel]===gamePattern[currlevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press any Key to Restart");
    startOver();
  }
}

function nextSequence()
{
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);
  var rnd=Math.floor(Math.random()*4);
  var rndChosenColor=buttonColors[rnd];
  gamePattern.push(rndChosenColor);

  $("#"+rndChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(rndChosenColor);
}

function playSound(name)
{
  switch(name)
  {
    case "red":
    case "blue":
    case "green":
    case "yellow":
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    break;

    default:
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
  }

}
 function animatePress(currentColor)
 {
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
     $("#"+currentColor).removeClass("pressed");
   },100);
 }
function startOver()
{
  level=0;
  gamePattern=[];
  start=false;
}
