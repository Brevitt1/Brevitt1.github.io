// Game variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var ship = { x: canvas.width / 2, y: canvas.height - 20, width: 40, height: 20 };
var bullets = [];
var invaders = [];
var score = 0;
var isGameOver = false;

// Load the image
var invaderImage = new Image();
invaderImage.src = "bird1.png";



// Create an invader object
function createInvader(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dx: 2
    };
}

// Create invaders
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 3; j++) {
        var invader = createInvader(i * 50 + 30, j * 30 + 30, 20, 20);
        invaders.push(invader);
    }
}
// Load the image for the ship
var shipImage = new Image();
shipImage.src = "hunter.png";

// Define the desired width and height for the ship
var shipWidth = 500;
var shipHeight = 480;


// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ship
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);

    // Draw the bullets
    ctx.fillStyle = "#00FF00";
    bullets.forEach(function (bullet) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw the invaders
    invaders.forEach(function (invader) {
        ctx.drawImage(invaderImage, invader.x, invader.y, invader.width, invader.height);
    });

    // Move the bullets
    bullets.forEach(function (bullet) {
        bullet.y -= 4;

        // Remove bullets that reach the top of the canvas
        if (bullet.y < 0) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }

        // Check for collision between bullets and invaders
        invaders.forEach(function (invader) {
            if (
                bullet.x < invader.x + invader.width &&
                bullet.x + bullet.width > invader.x &&
                bullet.y < invader.y + invader.height &&
                bullet.y + bullet.height > invader.y
            ) {
                // Remove the collided bullet and invader
                bullets.splice(bullets.indexOf(bullet), 1);
                invaders.splice(invaders.indexOf(invader), 1);

                // Increase the score
                score += 10;
            }
        });
    });

    // Move the invaders
    invaders.forEach(function (invader) {
        invader.x += invader.dx;

        // Reverse direction and move down when hitting the edges
        if (invader.x + invader.width > canvas.width || invader.x < 0) {
            invader.dx *= -1;
            invader.y += invader.height;
        }

        // Game over if invaders reach the ship
        if (invader.y + invader.height >= ship.y) {
            isGameOver = true;
        }
    });

       // Draw the score
       ctx.fillStyle = "#000000";
       ctx.font = "16px Arial";
       ctx.fillText("Score: " + score, 8, 20);
   
       if (isGameOver) {
           ctx.fillText("Game Over!", canvas.width / 2 - 50, canvas.height / 2);
           return;
       }
   
       requestAnimationFrame(draw);
   }
   
   // Move the ship with arrow keys
   document.addEventListener("keydown", function (event) {
       if (event.key === "ArrowLeft" && ship.x > 0) {
           ship.x -= 10;
       } else if (event.key === "ArrowRight" && ship.x + ship.width < canvas.width) {
           ship.x += 10;
       } else if (event.key === " ") { // Space key to shoot
           var bullet = {
               x: ship.x + ship.width / 2 - 2.5,
               y: ship.y - 10,
               width: 5,
               height: 10,
               dy: 5
           };
           bullets.push(bullet);
       }
   });
   
   draw();
   