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

var numberOfPlayers = "";

var _context;
var _snakeX;
var _snakeY;
var _snake = [];
var _tail;
var _snakeXSpeed = 0;
var _snakeYSpeed = 0;

window.onload = function(){ 
    canvas = this.document.getElementById('arena');
    context = canvas.getContext('2d');
    _context = canvas.getContext('2d')
    
    //comandos de controle
    document.addEventListener("keydown", keyPush);

    //iniciar a cobra no centro da tela
    snakeX = canvas.width/2 - box;
    snakeY = canvas.height/2 - box;


    //iniciar a cobra no centro da tela
    _snakeX = canvas.width/2 - box;
    _snakeY = canvas.height/2 - box;

    //posição inicial da fruta
    this.fruitX = 5 * box;
    this.fruitY = 5 * box;

    menu();
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

function gamePlayer1(){
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

function gamePlayer2() {
    //movimentação da cobra
    _snakeX += _snakeXSpeed;
    _snakeY += _snakeYSpeed;

    //BONUS-TRACK: cobra surge na direção oposta
    if(_snakeX < 0){
        _snakeX = canvas.width - box;
    }
    
    if((_snakeX+box) > canvas.width){
        _snakeX = 0;
    }

    if(_snakeY < 25){
        _snakeY = canvas.height - box;
    }

    if((_snakeY+box) > canvas.height){
        _snakeY = box;
    }

    _context.fillStyle = 'red';
    for(var i = 0; i < _snake.length; i++){
        _context.fillRect(_snake[i].x, _snake[i].y, box, box);

        if(_snake[i].x == _snakeX && _snake[i].y == _snakeY){
            _tail = 3;
            _snakeXSpeed = 0;
            _snakeYSpeed = 0;
            score = 0;
        }   
    }

    _snake.push({x: _snakeX, y: _snakeY});

    while(_snake.length > _tail){
        _snake.shift();
    }

    //Comendo a fruta
    if(fruitX==_snakeX && fruitY == _snakeY){
        _tail++;//BONUS-TRACK: A cobra cresce em 1 pixel a cada fruta comida.
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
    
    if (event.keyCode === 65) {
		_snakeXSpeed = -box;
        _snakeYSpeed = 0;
    } 

    else if (event.keyCode === 87) {
        _snakeXSpeed = 0;
        _snakeYSpeed = -box;
    } 

    else if (event.keyCode === 68) {
        _snakeXSpeed = box;
        _snakeYSpeed = 0;
    } 
    
    else if (event.keyCode === 83) {
        _snakeXSpeed = 0;
        _snakeYSpeed = box;
	}
}

//Menu
function menu(){
    var numberOfPlayersButtons = document.querySelectorAll(".optionPlayer");
    var startGameButton = document.getElementById("startGame");

    numberOfPlayersButtons.forEach(function(el){
        el.addEventListener("click", function(e){
            e.preventDefault();
            numberOfPlayers = this.dataset.players;
            console.log(numberOfPlayers)
            document.getElementById("menu").classList.add("hidden");
            document.getElementById("manual").classList.remove("hidden");
        })
    })

    startGameButton.addEventListener("click", function(e){
        e.preventDefault();
        document.getElementById("manual").classList.add("hidden");
        startGame();
    })
}

function startGame() {
    playMusic();
    //funções que rodação em frames/segundo
    this.setInterval(function(){
        draw();
        gamePlayer1();
        if(numberOfPlayers == "2") {
            gamePlayer2();
        }
    }, 1000/6); 
}