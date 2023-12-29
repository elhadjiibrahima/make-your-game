
// Elements HTML
const container = document.querySelector('#container');
const paddle = document.querySelector('#paddle');
const ball = document.querySelector('#ball');
const bricks = [];

let animationFrame;

// Paddle config
let moveLeft = false;
let moveRight = false;
const step = 20;

// Ball config
let ballRadius = 10;
let ballDx = 3;
let ballDy = -3;

// Brick config
let brickWidth = 100;
let brickHeight = 22;
let brickMargin = 10;

let numberBrickPerLine = 6;
let numberBrickPerColumn = 2;

let brickOffsetLeft = 25;
let brickOffsetTop = 70;

let score = 0;

// Timer config
let seconds = 0;
let minutes = 0;
let timerInterval;

// Function to update the timer display
function updateTimer() {
    const timerElement = document.getElementById('timerValue');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateTimer();
    }, 1000);
}

// ... (existing code)

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// ... (existing code)

// Reset the timer
function resetTimer() {
    seconds = 0;
    minutes = 0;
    updateTimer();
}


// Ajoutez cette fonction pour mettre à jour l'affichage du score
function updateScore() {
    const scoreElement = document.getElementById('scoreValue');
    if (scoreElement) {
        scoreElement.textContent = `${score}`;
    }
}
let life =  3

function updateLives() {
    const livesElement = document.getElementById('lifeValue');
    if (livesElement) {
        livesElement.textContent = ` ${life}`;
    }
}
let isPaused = false;

function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
        cancelAnimationFrame(animationFrame);
        stopTimer();
    } else {
        startTimer();
        loop();
    }
}
/**
 * Keyboard event
 */
function initClick() {
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('continue');

    if (pauseButton && resumeButton) {
        pauseButton.addEventListener('click', togglePause, false,stopTimer( ));
        

        resumeButton.addEventListener('click', togglePause, false);
    }
}
function initKeyboardListener() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('keydown', onSpaceKeyDown, false);
}
function onSpaceKeyDown(event) {
    if (event.code === 'P') {
        togglePause();
    }
}

/**
 * On key down keyboard
 */
function onKeyDown(event) {
    if (event.key === 'ArrowRight') {
        moveRight = true;
    }
    else if (event.key === 'ArrowLeft') {
        moveLeft = true;
    }
}

/**
 * On key up keyboard
 */
function onKeyUp(event) {
    if (event.key === 'ArrowRight') {
        moveRight = false;
    }
    else if (event.key === 'ArrowLeft') {
        moveLeft = false;
    }
}

/**
 * Move Paddle
 */
function movePaddle() {


    let currentPositionLeft = paddle.offsetLeft;

    if (moveRight) {
        currentPositionLeft += step;
    }
    else if(moveLeft) {
        currentPositionLeft -= step;
    }

    // Limit Left
    if(currentPositionLeft < 0) {
        currentPositionLeft = 0;
    }

    // Limit Right
    if(currentPositionLeft + paddle.offsetWidth > container.offsetWidth) {
        currentPositionLeft = container.offsetWidth - paddle.offsetWidth;
    }

    paddle.style.left = currentPositionLeft + 'px';
}

/**
 * Ball move
 */
function  showGameOverModal(score) {
    // Affiche la fenêtre modale de Game Over avec le score final
    document.getElementById('finalScore').innerText = score;
    document.getElementById('gameOverModal').style.display = 'block';
       
}
let gameOver=false
function checkGameOver() {
    if (life <= 0 && !gameOver) {
        // Arrête la boucle du jeu
        cancelAnimationFrame(animationFrame);
        // Affiche un message de fin de jeu
        showGameOverModal(score)
        // Recharge la page pour permettre au joueur de rejouer
        stopTimer()
        life =0 

    }
}


function moveBall() {
    let currentPositionLeft = ball.offsetLeft;
    let currentPositionTop = ball.offsetTop;

    // Limit left
    if (currentPositionLeft < 0) {
        ballDx = -ballDx;
    }

    // Limit Right
    if (currentPositionLeft + ballRadius * 2 > container.offsetWidth) {
        ballDx = -ballDx;
    }

    // Limit Top
    if (currentPositionTop < 0) {
        ballDy = -ballDy;
    }
    if (currentPositionTop + ballRadius * 2 > container.offsetHeight) {
        life--;
        togglePause();
    // Limit Bottom
    if (life<=0) {
        ball.style.display='none'
       checkGameOver()  
       

    } else {
        // Réinitialisez la position de la balle et du paddle
        currentPositionLeft = container.offsetWidth / 2 - ballRadius;
        currentPositionTop = container.offsetHeight - 30 - ballRadius * 2;
        paddle.style.left = 250 + 'px'
        ballDx = 3;
        ballDy = -3;
    }
    updateLives();
}
cancelAnimationFrame(animationFrame)

    currentPositionLeft += ballDx;
    currentPositionTop += ballDy;


    ball.style.left = currentPositionLeft + 'px';
    ball.style.top = currentPositionTop + 'px';
    checkCollisionBricks()
    checkCollisionPaddle()
}

/**
 * Check collision between paddle and ball
 */
function checkCollisionPaddle() {
    let ballX = ball.offsetLeft + ballRadius;
    let ballBottomY = ball.offsetTop + ballRadius * 2;

    let paddleLeft = paddle.offsetLeft;
    let paddleTop = paddle.offsetTop;
    let paddleRight = paddleLeft + paddle.offsetWidth;
    let paddleBottom = paddleTop + paddle.offsetHeight;

    // Collision
    if (ballX > paddleLeft && ballX < paddleRight &&
        ballBottomY > paddleTop && ballBottomY < paddleBottom
    ) {
        ballDy = -ballDy;

        if (ballX < paddleLeft + paddle.offsetWidth / 2) {
            ballDx = -Math.abs(ballDx);
        }

        if (ballX > paddleLeft + paddle.offsetWidth / 2) {
            ballDx = Math.abs(ballDx);
        }

    }
}

function resetGame() {
    currentPositionLeft = container.offsetWidth / 2 - ballRadius;
    currentPositionTop = container.offsetHeight - 30 - ballRadius * 2;
    paddle.style.left =container.offsetWidth / 2 - paddle.offsetWidth / 2 + 'px';
    ball.style.left = currentPositionLeft + 'px';  // Réinitialise la position de la balle
    ball.style.top = currentPositionTop + 'px';
    ballDx = 3;
    ballDy = -3;
    numberBrickPerColumn++;
    createBrick();
   gameOver=false
   

}


/**
 * Check collision between bricks and ball
 */
function checkCollisionBricks() {
    let ballX = ball.offsetLeft + ballRadius;
    let ballY = ball.offsetTop + ballRadius;

    for (let i = bricks.length - 1; i >= 0; i--) {
        let b = bricks[i];

        let brickLeft = b.offsetLeft;
        let brickTop = b.offsetTop;
        let brickRight = brickLeft + b.offsetWidth;
        let brickBottom = brickTop + b.offsetHeight;

        // Collision
        if (ballX > brickLeft &&
            ballX < brickRight &&
            ballY + ballRadius > brickTop &&
            ballY - ballRadius < brickBottom
        ) {
            ballDy = -ballDy;

            container.removeChild(b);
            score += 10;
            updateScore();
            bricks.splice(i, 1);

            if (bricks.length === 0) {
                // cancelAnimationFrame(animationFrame);
                resetGame(); // Nouvelle fonction pour réinitialiser le jeu
            }
        }
    }
}


/**
 * Create all bricks
 */
function createBrick() {
    let positionX = brickOffsetLeft;
    let positionY = brickOffsetTop;

    for (let i = 0; i < numberBrickPerColumn; i++) {
        for(let j = 0; j < numberBrickPerLine; j++) {
            let brick = document.createElement('div');
            brick.className = 'brick';

            brick.style.width = 15 + '%';
            brick.style.height = 3 + '%';
            brick.style.left = positionX + 'px';
            brick.style.top = positionY + 'px'; 

            container.appendChild(brick);

            positionX += brickWidth + brickMargin;

            bricks.push(brick);
        }

        positionX = brickOffsetLeft;
        positionY += brickHeight + brickMargin;
    }
}


function loop(){
    animationFrame = window.requestAnimationFrame(function() {
        movePaddle();
        moveBall();
        // checkCollisionPaddle();
        // checkCollisionBricks();
        checkGameOver()
        

        
        
        loop();
    })
    
}


createBrick();
function init() {
    //Init
    initClick();
    initKeyboardListener();
    resetTimer(); 
    startTimer();
    
    loop();

    
}
 a=true;
document.addEventListener('keydown', function (e) {
   if (e.code=='Enter' && a){
    a=false;
    init();
   } 
});