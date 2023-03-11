var order = []; // array to store the order of the buttons
var playerOrder = []; // array to store the order of the player clicks
var turn; //  store the number of turns 
var rightB; //  store if the player clicked the right buttons
var compTurn; // store if it is the computer's turn
var intervalId; // store the interval
var flash; // variable to store the number of flashes
var active; // store if the game is active
var win; // store if the player won
var heigestScore=0; // store the heigest score
var overtime=false; // store if the player exceed the time limit
var GameOn = false; // store if the game is on
var turnCounter = document.querySelector("#turn"); // get the element turn
const heigestScoreCounter = document.querySelector("#s2"); // get the element s2
var activateButton = document.querySelector("#text2"); // get the element text2
var greenButton = document.querySelector("#green"); // get the element green
var redButton = document.querySelector("#red"); // get the element red
var yellowButton = document.querySelector("#yellow"); // get the element yellow
var blueButton = document.querySelector("#blue"); // get the element blue
var startButton = document.querySelector("#start");   // get the element start
var timer1; // store the timer for the time limit
var time = 0; // store the time limit

function start(){ // start the game
  overtime=false; // set overtime to false
  GameOn = true; // set GameOn to true
    win = false; // set win to false
    activateButton.style.backgroundColor = "green"; // change the color of the button to green
    setTimeout(() => { // set a timeout
    play(); // call the play function
    }, 3000); // set the timeout to 3 seconds
}

function timer(){ // timer function
  
    time = 0; // set time to 0
    timer1 = setInterval(function(){ // set the timer
        time++; // increment time
        if(time >= 5){ // if time is greater than 5
            clearInterval(timer1); // clear the timer
            overtime=true; // set overtime to true
        } 
    }, 1000); // set the interval to 1 second
}







function play() { // play function

  time = 0; // set time to 0
  win = false; // set win to false
  order = []; // set order to an empty array
  playerOrder = []; // set playerOrder to an empty array
  flash = 0; // set flash to 0
  intervalId = 0; // set intervalId to 0
  turn = 1; // set turn to 1
  turnCounter.innerHTML = 1; 
  rightB = true; // set right button to true
  for (var i = 0; i < 20; i++) { 
    order.push(Math.floor(Math.random() * 4) + 1); // push a random num between 1 and 4 to the order array
  }
  compTurn = true; // set compTurn to true 
    intervalId = setInterval(gameTurn, 700); // set the initiall interval to 700 milliseconds
}

function check() { // check function
  
    
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]){  // if the last elements of the playerOrder and the order array are not equal 
    rightB = false; // set rightB to false
  }
    
  if (playerOrder.length == 20 && rightB) { // if the player finished th 20 rounds and clicked the right buttons
    heigestScore = 20; // set heigestScore to 20
    heigestScoreCounter.innerHTML = heigestScore;
    winGame(); // call the winGame function
  }

  if ((rightB == false ||overtime==true)) { // if the player clicked the wrong buttons or exceed the time limit
    clearInterval(timer1); // clear the timer
    for(var i=500; i <= 2500; i=i+500) // flash all the buttons 5 times
{
	setTimeout(" clearColor()",i); 
	setTimeout("flashColor()",i+250);
  if(i==2500){
    setTimeout(" clearColor()",i+500);
  }
}
clearColor(); // clear the color of the buttons
    activateButton.style.backgroundColor = "red"; // change the color of the small circle to red
    setTimeout(() => {
      turnCounter.innerHTML = turn;
    }, 3000);
  }
   
  if (turn == playerOrder.length && rightB && !win) { //if the player still on the right track and didn't win
    
    turn++; // increment turn
    playerOrder = []; // set playerOrder to an empty array
    compTurn = true; // set compTurn to true
    flash = 0; // set flash to 0
    turnCounter.innerHTML = turn; // set the turnCounter to the current turn

    if (heigestScore < turn) { // if the heigestScore is less than the current turn
        heigestScore = turn; // set heigestScore to the current turn
        heigestScoreCounter.innerHTML = heigestScore;
    }

    if(turn<5){ // set the interval to a different value depending on the turn
        intervalId = setInterval(gameTurn, 700);
    }
    else if(turn>=5&&turn<9){
        intervalId = setInterval(gameTurn, 500);
    }
    else if(turn>=9&&turn<13){
        intervalId = setInterval(gameTurn, 300);
    }
    else{
        intervalId = setInterval(gameTurn, 200);
    }

  }
}

function gameTurn() { // gameTurn function
  GameOn = false; // set GameOn to false
  if (flash == turn) { // if the flash is equal to the current turn
    timer();  //set timer for player
    clearInterval(intervalId); // clear the interval
    compTurn = false; // set compTurn to false
    clearColor(); // clear the color of the buttons
    GameOn = true; // set GameOn to true
  }

  if (compTurn) { // if it's the computer turn
    clearInterval(timer1); // clear the timer in the computer turn
    clearColor(); // clear the color of the buttons
    setTimeout(() => { // set a timeout
      if (order[flash] == 1) green(); // call the function of the button that should be flashed
      if (order[flash] == 2) red(); 
      if (order[flash] == 3) yellow(); 
      if (order[flash] == 4) blue();  
      flash++; // increment flash
    }, 200);
  }
}
function winGame() { // if the player won
  flashColor(); // flash the color of the buttons
  turnCounter.innerHTML = "'-'"; // change the turnCounter to '-'
  GameOn = false; // set on to false
  win = true; // set win to true
}

function green() { 
    greenButton.style.backgroundColor = "#16ff0a"; // change the color of the button 
}

function red() {
    redButton.style.backgroundColor = "#ff230a"; // change the color of the button
}

function yellow() {
    yellowButton.style.backgroundColor = "#fafa00"; // change the color of the button
}

function blue() {
    blueButton.style.backgroundColor = "#0ac2ff"; // change the color of the button
}

function clearColor() { // clear the color of the buttons
    greenButton.style.backgroundColor = "#008700";
    redButton.style.backgroundColor = "#8d0000";
    yellowButton.style.backgroundColor = "#9a9a01";
    blueButton.style.backgroundColor = "#0000ac";
    }

function flashColor() { // flash the color of all buttons
    greenButton.style.backgroundColor = "#16ff0a";
    redButton.style.backgroundColor = "#ff230a";
    yellowButton.style.backgroundColor = "#fafa00";
    blueButton.style.backgroundColor = "#0ac2ff";
}

// add event listener to the buttons
greenButton.addEventListener('click', (event) => { 
  if (GameOn) { // if GameOn is true
    playerOrder.push(1); // push 1 to the playerOrder array
    check(); // check if the player clicked the right buttons
    green(); // flash the green button
    if (!win) { // if the player didn't win
      setTimeout(() => {
        clearColor(); // clear the color of the buttons
      }, 300);
    }
  }
})

redButton.addEventListener('click', (event) => { 
  if (GameOn) { 
    playerOrder.push(2);
    check();
    red();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

yellowButton.addEventListener('click', (event) => {   
  if (GameOn) {
    playerOrder.push(3);
    check();
    yellow();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

blueButton.addEventListener('click', (event) => {
  if (GameOn) {
    playerOrder.push(4);
    check();
    blue();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})






