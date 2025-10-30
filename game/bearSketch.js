let inputMode; //defaults to conroller if connected, otherwise keyboard
let connectedGamepad = null;
//const DEADZONE = 0.15;

let bg;
let bearImage;
let graySquirrelImage;
let brownSquirrelImage;
let bgColor = 'forestgreen';

// player objects
let player1;
let player2;
let bear;

/* 
Gamepad API Event Listeners
*/
//listen for when a gamepad is connected
window.addEventListener("gamepadconnected", (event) => {
  console.log("Gamepad connected", event.gamepad);
  connectedGamepad = event.gamepad; // assign the connected gamepad to var
  player1.addGamePad(0);
});

window.addEventListener("gamepaddisconnected",(event) => {
  console.log("Gamepad disconnected:", event.gamepad);
  // if disconnected gamepad was active, clear it
  if( connectedGamepad && connectedGamepad.index === event.gamepad.index ) {
    connectedGamepad = null;
  }
});

function preload() {
  bg = loadImage('media/images/background/chatgpt_background01.png');
  bearImage = loadImage('media/images/bear/chatgpt_static_bear.png');
  graySquirrelImage = loadImage('media/images/graySquirrel/graySquirrel.png');
  brownSquirrelImage = loadImage('media/images/brownSquirrel/brownSquirrel.png');
}

function setup() {

  createCanvas(windowWidth * .9, windowHeight * .9);
	background(bgColor);

 	player1 = new Player(graySquirrelImage,createVector(width - 300, height / 2));
  player2 = new Player(brownSquirrelImage,createVector(width - width/2, height - 300));
  bear = new Bear(bearImage,createVector(width/2, height / 2));
}

//function called from 'gamepadconnected' event


function draw() {

  background(bg);

  // gamepad takes priority
  if( !connectedGamepad ) {
    readKB();
  }
 
 	player1.update();
 	player1.move();
 	player1.show();

//  player2.update();
// 	player2.move();
// 	player2.show();

 }

// -- gamepad input handling -- //
// -- helper function -- //
// function readGamepad(index) {



// }

function readKB() {
  if (keyIsDown(87)) {
		player1._directionalInput.up = true;
  }
  else {
    player1._directionalInput.up = false;
  }
  if (keyIsDown(83)) {
		player1._directionalInput.down = true;
  }
  else {
    player1._directionalInput.down = false;
  }  
  if (keyIsDown(65)) {
		player1._directionalInput.left = true;
  }
  else {
    player1._directionalInput.left = false;
  }  
  if (keyIsDown(68)) {
		player1._directionalInput.right = true;
  }
  else {
    player1._directionalInput.right = false;
  } 

  // if (keyIsDown(UP_ARROW))
	// 	player2.cardinalMovement = "goUp";
  // else if (keyIsDown(DOWN_ARROW))
	// 	player2.cardinalMovement = "goDown";
  // else if (keyIsDown(LEFT_ARROW))
	// 	player2.cardinalMovement = "goLeft";
  // else if (keyIsDown(RIGHT_ARROW))
	// 	player2.cardinalMovement = "goRight";
	// else player2.cardinalMovement = "none";
	
}



