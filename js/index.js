var canvas;
var context;
var box = 25;
var gameOver=0;

var snakeX;
var snakeY;
var snake = [];
var tail;
var snakeXSpeed = 0;
var snakeYSpeed = 0;
var score = 0;

var isPlaying = false;

window.onload = function(){ 
    canvas = this.document.getElementById('arena');
    context = canvas.getContext('2d');
    
    //comandos de controle
    document.addEventListener("keydown", keyPush);

    //iniciar a cobra no centro da tela
    snakeX = canvas.width/2 - box;
    snakeY = canvas.height/2 - box;

    //posição inicial da fruta
    this.fruitX = 5 * box;
    this.fruitY = 5 * box;

    //funções que rodação em frames/segundo
    this.setInterval(function(){
        draw();
        game();
    }, 1000/7); 
}

function playMusic() {
    if(!isPlaying) {
        const audio = new Audio('./audio/game.mp3');
        audio.play();
        audio.loop = true;
    }
    isPlaying = true;
}

function draw(){
    rect(0, 0, canvas.width, canvas.height, 'black');//setup arena
    rect(fruitX, fruitY, box, box, 'white');//setup fruta
    rect(0, 0, canvas.width, 25, 'lime');//setup display score
    text('score: ' + score, '15px Gameplay', 5, 18, 'black');//setup score
}

function game(){
    //movimentação da cobra
    snakeX += snakeXSpeed;
    snakeY += snakeYSpeed;

    //BONUS-TRACK: cobra surge na direção oposta
    if(snakeX < 0){
        snakeX = canvas.width - box;
    }
    
    if((snakeX+box) > canvas.width){
        snakeX = 0;
    }

    if(snakeY < 25){
        snakeY = canvas.height - box;
    }

    if((snakeY+box) > canvas.height){
        snakeY = box;
    }

    context.fillStyle = 'blue';
    for(var i = 0; i < snake.length; i++){
        context.fillRect(snake[i].x, snake[i].y, box, box);

        if(snake[i].x == snakeX && snake[i].y == snakeY){
            tail = 3;
            snakeXSpeed = 0;
            snakeYSpeed = 0;
            score = 0;
            if(fruitX != 5 * box && fruitY != 5 * box){
                text('Game Over', '70px Gameplay', box, canvas.height/2+20, 'red');
            } 
        }   
    }

    snake.push({x: snakeX, y: snakeY});

    while(snake.length > tail){
        snake.shift();
    }

    //Comendo a fruta
    if(fruitX==snakeX && fruitY == snakeY){
        tail++;//BONUS-TRACK: A cobra cresce em 1 pixel a cada fruta comida.
        score += 100;
        fruitX = Math.round(Math.random() * (400 / box)) * box + box;//posição da nova fruta em X
        fruitY = Math.round(Math.random() * (400 / box)) * box + box;//posição da nova fruta em Y
    }
}

function rect(x, y, w, h, cor) {
	context.fillStyle = cor;
	context.fillRect(x, y, w, h);
}

function text(txt, fnt, x, y, cor) {
	context.fillStyle = cor;
	context.font = fnt;
	context.fillText(txt, x, y);
}

function keyPush(event){
    playMusic();

    if (event.keyCode === 37) {
		snakeXSpeed = -box;
        snakeYSpeed = 0;
    } 

    else if (event.keyCode === 38) {
        snakeXSpeed = 0;
        snakeYSpeed = -box;
    } 

    else if (event.keyCode === 39) {
        snakeXSpeed = box;
        snakeYSpeed = 0;
    } 
    
    else if (event.keyCode === 40) {
        snakeXSpeed = 0;
        snakeYSpeed = box;
    }
}