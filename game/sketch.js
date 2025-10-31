// boids by Daniel Shiffman <http://codingtra.in>
// A simple flocking simulation
// https://youtu.be/hd1ZQYkEY3c


let connectedGamepad = null;


let flock;
let flockCount = 30;
let bg;
let bearImage;
let beeImage;
let player1;
let beeHiveImage;
let beeHive;
let beeHivePosition;

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
  beeImage = loadImage('media/images/Bee.png');``
  graySquirrelImage = loadImage('media/images/graySquirrel/graySquirrel.png');
  brownSquirrelImage = loadImage('media/images/brownSquirrel/brownSquirrel.png');
  beeHiveImage = loadImage('media/images/beeHive.png');
}


function setup() {
  createCanvas(1200, 800);
  createP('Drag the mouse to generate new boids.');

  bearImage.resize(60,60);
  graySquirrelImage.resize(50,45);
  brownSquirrelImage.resize(50,45);
  beeImage.resize(30,30);
  beeHiveImage.resize(40,40);

  player1 = new Player(bearImage,createVector(width/2, height / 2));
  beeHivePosition = createVector(415, 327);

  flock = new Flock();

  // Add an initial set of boids into the system
//   for (let i = 0; i < flockCount; i++) {
//     let b = new Boid(random(width), random(height));
//     flock.addBoid(b);
//   }

  describe(
    'A group of bird-like objects, represented by triangles, moving across the canvas, modeling flocking behavior.'
  );
}

function draw() {
  imageMode(mode= CORNER);
  background(bg);
  flock.run();
  imageMode(mode= CENTER);
  image(beeHiveImage, 415, 327);

  //draw the bear at the mouse position
  //  image(bearImage, mouseX - bearImage.width / 2, mouseY - bearImage.height / 2);

   	player1.update();
 	  player1.move();
 	  player1.show();
}

// On mouse drag, add a new boid to the flock
function mouseClicked() {

    flock.addBoid(new Boid(beeHivePosition.x, beeHivePosition.y));
}

// Flock class to manage the array of all the boids
class Flock {
  constructor() {
    // Initialize the array of boids
    this.boids = [];
  }

  run() {
    
    //test for boid despawning
    for (let i=this.boids.length-1; i>=0; i--) {
      if (this.boids[i].isNearBeeHive()) {
        this.boids.splice(i, 1);
      }
    }   

    for (let boid of this.boids) {
      // Pass the entire list of boids to each boid individually
      boid.run(this.boids);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}

