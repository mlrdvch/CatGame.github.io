var GAME = {
    width: 500,
    height: 500,
    image: new Image(),
}

var canvas = document.getElementById("canvas"); // задаем канвас
var canvasWidth = GAME.width;
var canvasHeight = GAME.height;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "#F5F0E1"
canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

var BALL = {
    color: "#FF6E40",
    x: 100,
    y: 80,
    radius: 60,
    xDirection: 3,
    yDirection: 5,
    image: new Image(),
}

var RAKET = {
    color: "gray",
    x: 0,
    y: 375,
    width: 120,
    heigt: 120,
    xDirection: 30,
    score: 0,
    image: new Image(),
}

function drawBall() {
    canvasContext.drawImage(BALL.image, BALL.x, BALL.y, BALL.radius, BALL.radius)
}
drawBall()

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if ((BALL.y + BALL.radius > GAME.height) || (BALL.y - BALL.radius < 0)) {
        BALL.yDirection = -BALL.yDirection;
    }
    if ((BALL.x + BALL.radius > GAME.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xDirection = -BALL.xDirection;
    }

    var raketTopLineCollision = BALL.y + BALL.radius > RAKET.y;
    var rakeLeftLineCollision = BALL.x + BALL.radius > RAKET.x;
    var rakeRightLineCollision = BALL.x - BALL.radius < RAKET.x + RAKET.width;
    var raketDownLineCollision = BALL.y - BALL.radius < RAKET.y + RAKET.heigt

    if ((raketTopLineCollision) && (rakeLeftLineCollision) && (rakeRightLineCollision) && (raketDownLineCollision)) {
        BALL.yDirection = -BALL.yDirection;
        BALL.xDirection = -BALL.xDirection;
        RAKET.score = RAKET.score + 1;
        console.log("Score: " + RAKET.score + "/10");
    }

    if (BALL.y + BALL.radius > GAME.height) {
        RAKET.score = RAKET.score - 1;
        console.log("Score: " + RAKET.score + "/10");
    }
}

function drawRaket() {
    canvasContext.drawImage(RAKET.image, RAKET.x, RAKET.y, RAKET.width, RAKET.heigt)
}

drawRaket()

function drawScore() {
    canvasContext.font = '48px serif';
    canvasContext.fillText("Score: " + RAKET.score + "/10", 10, 50);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackround();
    drawBall();
    drawRaket();
    drawScore();
}

function initBackroundImage() {
    GAME.image.src = "Kovernew.jpeg";
}

initBackroundImage();

function initBAllImage() {
    BALL.image.src = "vodka.png";
}

initBAllImage();

function initRaketImage() {
    RAKET.image.src = "cat.png";
}

initRaketImage();

function drawVicrory() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackround();
    canvasContext.fillStyle = "white";
    canvasContext.font = '60px serif';
    canvasContext.textAlign = "center";
    canvasContext.fillText("WIN!", GAME.width / 2, GAME.height / 2);

}

function drawBackround() {
    canvasContext.drawImage(GAME.image, 0, 0, GAME.width, GAME.height)
}

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove)
    window.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        RAKET.x = RAKET.x - RAKET.xDirection;
    }
    if (event.key === "ArrowRight") {
        RAKET.x = RAKET.x + RAKET.xDirection;
    }
    clampRaketPosition();
}

function onCanvasMouseMove(event) {
    RAKET.x = event.clientX;
    clampRaketPosition();
}

function clampRaketPosition() {
    if (RAKET.x < 0) {
        RAKET.x = 0;
    }
    if (RAKET.x + RAKET.width > GAME.width) {
        RAKET.x = GAME.width - RAKET.width;
    }
}

initEventsListeners();

function play() {
    drawFrame();
    drawBall();
    updateBall();

    if (RAKET.score === 10) {
        drawVicrory();
    }

    if (RAKET.score < 10) {
        requestAnimationFrame(play);
    }

}
play();