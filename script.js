// script.js

// Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const BALL_SPEED = 4;
const AI_SPEED = 4;
const PLAYER_SPEED = 10;

// Canvas and Context
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Game variables
let playerY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let aiY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let ballX = (CANVAS_WIDTH - BALL_SIZE) / 2;
let ballY = (CANVAS_HEIGHT - BALL_SIZE) / 2;
let ballSpeedX = BALL_SPEED;
let ballSpeedY = BALL_SPEED;

// Draw functions
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

// Movement functions
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY + BALL_SIZE >= CANVAS_HEIGHT) {
    ballSpeedY *= -1;
  }

  // Ball collision with player paddle
  if (ballX <= PADDLE_WIDTH && ballY >= playerY && ballY <= playerY + PADDLE_HEIGHT) {
    ballSpeedX *= -1;
  }

  // Ball collision with AI paddle
  if (ballX >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE && ballY >= aiY && ballY <= aiY + PADDLE_HEIGHT) {
    ballSpeedX *= -1;
  }

  // Ball reset if out of bounds
  if (ballX < 0 || ballX > CANVAS_WIDTH) {
    resetBall();
  }
}

function moveAI() {
  const centerAI = aiY + PADDLE_HEIGHT / 2;
  if (centerAI < ballY) {
    aiY += AI_SPEED;
  } else {
    aiY -= AI_SPEED;
  }
}

function resetBall() {
  ballX = (CANVAS_WIDTH - BALL_SIZE) / 2;
  ballY = (CANVAS_HEIGHT - BALL_SIZE) / 2;
  ballSpeedX = BALL_SPEED;
  ballSpeedY = BALL_SPEED;
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw paddles and ball
  drawRect(0, playerY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  drawRect(CANVAS_WIDTH - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  drawBall(ballX, ballY, BALL_SIZE, "white");

  // Move ball and AI
  moveBall();
  moveAI();

  requestAnimationFrame(gameLoop);
}

// Event listener for player controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerY > 0) {
    playerY -= PLAYER_SPEED;
  } else if (e.key === "ArrowDown" && playerY + PADDLE_HEIGHT < CANVAS_HEIGHT) {
    playerY += PLAYER_SPEED;
  }
});

// Start game loop
gameLoop();
