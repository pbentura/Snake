let blockSize = 25;
let rows = 25;
let columns = 25;
let board;
let ctx;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let isPaused = false
let score = 0;
let highScore = localStorage.getItem("highScore")

let timeout = 90;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  ctx = board.getContext("2d");

  console.log(localStorage.getItem("highScore"))

  document.getElementById("highScore").innerHTML = localStorage.getItem("highScore")

  placeFood();

  document.addEventListener("keyup", changeDirection);
  setInterval(update, timeout);
};

function update() {
  if (gameOver) {
      if (score > highScore){
          highScore = score
          localStorage.setItem("highScore", highScore);
      }
  }
  if (gameOver || isPaused) {
    return;
  }

  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, board.width, board.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    score += 1;
    document.getElementById('score').innerHTML = score;
    placeFood();

    // setInterval(update,timeout-5)
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  ctx.fillStyle = "#CFD11D";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // si le serpent touche le bord ou qu'il se touche lui meme on affiche une alerte
  if (
    snakeX < 0 ||
    snakeX > columns * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    Swal.fire({
      icon: "error",
      title: "Game over",
      text: "You lost big noob ! you ate " + score + " apples",
      showConfirmButton: false,
      html: '<a href="../html/snake.html" class="btn btn-outline-danger">Restart</a>',
      footer: '<a href="../html/index.html" class="btn btn-success">Quit</a>',
    });
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      Swal.fire({
        icon: "error",
        title: "Game over",
        text: "You lost big noob ! you ate " + score + " apples",
        showConfirmButton: false,
        html: '<a href="../html/snake.html" class="btn btn-outline-danger">Restart</a>',
        footer: '<a href="../html/index.html" class="btn btn-success">Quit</a>',
      });
    }
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
  else if (e.code === "Space") {
    isPaused = !isPaused
  }
}
function placeFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
