const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.border = '1px solid #6198d8';
ctx.lineWidth = 1;

/* ===== Constantes necessaires */
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTON = 20;
const PADDLE_HEIGHT = 10;
// propriete de la planche 
const paddle = {
    x: (canvas.width / 2) - (PADDLE_WIDTH /2),
    y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    dx: 8
}

//Déssiner la planche
function drawPaddle() {
    ctx.beginPath();

    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.strokeStyle = '#6198d8';
    ctx.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);

    ctx.closePath();
}


drawPaddle();

const rules = document.getElementById('rules')
const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
});

/* ===== DES IMAGES */