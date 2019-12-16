var canvas;
var context;

var box = 25;
var gameOver = 0;
var sFruit = 9 * box;

var isPlaying = false;

var numberOfPlayers = "";

var snakeX;
var snakeY;
var snake = [];
var tail;
var snakeXSpeed = 0;
var snakeYSpeed = 0;
var score = 0;

//As configurações do segundo jogador possuem um underline na frente
var _context;
var _snakeX;
var _snakeY;
var _snake = [];
var _tail;
var _snakeXSpeed = 0;
var _snakeYSpeed = 0;
var _score = 0;

//Menu
function menu(){
    var numberOfPlayersButtons = document.querySelectorAll(".optionPlayer");
    var startGameButton = document.getElementById("startGame");

    numberOfPlayersButtons.forEach(function(el){
        el.addEventListener("click", function(e){
            e.preventDefault();
            numberOfPlayers = this.dataset.players;
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

//audio de fundo
function playMusic() {
    if(!isPlaying) {
        const audio = new Audio('./audio/game.mp3');
        audio.play();
        audio.loop = true;
    }
    isPlaying = true;
}

//Inicialização do jogo
function startGame() {
    playMusic();

    //funções que rodarão em frames/segundo
    this.setInterval(function(){
        draw();
        gamePlayer1();
        if(numberOfPlayers == "2") {
            gamePlayer2();
        }
    }, 1000/6); 
}

//Setup geral do jogo
window.onload = function(){ 
    canvas = this.document.getElementById('arena');
    context = canvas.getContext('2d');
    _context = canvas.getContext('2d')
    
    //comandos de movimentação da cobra
    document.addEventListener("keydown", keyPush);

    //posição inicial do jogador 1
    snakeX = 5 * box;
    snakeY = 9 * box;

    //posição inicial do jogador 2
    _snakeX = 13 * box;
    _snakeY = 9 * box;

    //posição inicial da fruta
    this.fruitX = this.sFruit;
    this.fruitY = this.sFruit;

    menu();
}

//desenho dos elementos estáticos
function draw(){
    rect(0, 0, canvas.width, canvas.height, 'black');//arena
    rect(fruitX, fruitY, box, box, 'white');//fruta
    rect(0, 0, canvas.width, 25, 'lime');//display score
    text('score P1: ' + score, '15px Gameplay', 5, 18, 'black');//contador score jogador 1
    text('score P2: ' + _score, '15px Gameplay', 350, 18, 'black');//contator score jogador 2
}

//Dinâmica de jogo para o jogador 1
function gamePlayer1(){

    //movimentação da cobra
    snakeX += snakeXSpeed;
    snakeY += snakeYSpeed;

    //BONUS-TRACK: cobra surge na direção oposta
    if(snakeX < 0){
        snakeX = canvas.width - box;
    }
    
    if((snakeX + box) > canvas.width){
        snakeX = 0;
    }

    if(snakeY < 25){
        snakeY = canvas.height - box;
    }

    if((snakeY + box) > canvas.height){
        snakeY = box;
    }
    
    //desenho da cobra
    context.fillStyle = 'blue';
    for(var i = 0; i < snake.length; i++){
        context.fillRect(snake[i].x, snake[i].y, box, box);

        //BONUS-TRACK: O jogo acaba quando a cobra encosta em alguma parte do seu próprio corpo
        if(snake[i].x == snakeX && snake[i].y == snakeY){
            tail = 3;
            snakeXSpeed = 0;
            snakeYSpeed = 0;
            score = 0;
            //Tela game over
            if(fruitX != sFruit && fruitY != sFruit){
                text('Game Over', '70px Gameplay', box, canvas.height/2+20, 'red');
            } 
        }   
    }
    //Contole de tamanho da cobra
    snake.push({x: snakeX, y: snakeY});

    while(snake.length > tail){
        snake.shift();
    }

    //Comendo a fruta
    if(fruitX == snakeX && fruitY == snakeY){
        //BONUS-TRACK: A cobra cresce em 1 pixel a cada fruta comida.
        tail++;
        //Pontos ganhos
        score += 100;
        //posição da nova fruta
        fruitX = Math.round(Math.random() * (400 / box)) * box + box;
        fruitY = Math.round(Math.random() * (400 / box)) * box + box;
    }
}

//Dinâmica para o jogador 2
function gamePlayer2() {

    //Movimentação da cobra
    _snakeX += _snakeXSpeed;
    _snakeY += _snakeYSpeed;

    //BONUS-TRACK: cobra surge na direção oposta
    if(_snakeX < 0){
        _snakeX = canvas.width - box;
    }
    
    if((_snakeX + box) > canvas.width){
        _snakeX = 0;
    }

    if(_snakeY < 25){
        _snakeY = canvas.height - box;
    }

    if((_snakeY + box) > canvas.height){
        _snakeY = box;
    }

    //Desenho da cobra
    _context.fillStyle = 'magenta';
    for(var i = 0; i < _snake.length; i++){
        _context.fillRect(_snake[i].x, _snake[i].y, box, box);

        //BONUS-TRACK: O jogo acaba quando a cobra encosta em alguma parte do seu próprio corpo
        if(_snake[i].x == _snakeX && _snake[i].y == _snakeY){
            _tail = 3;
            _snakeXSpeed = 0;
            _snakeYSpeed = 0;
            _score = 0;
            //Tela game over
            if(fruitX != sFruit && fruitY != sFruit){
                text('Game Over', '70px Gameplay', box, canvas.height/2+20, 'red');   
            }
        }   
    }

    //Contole de tamanho da cobra
    _snake.push({x: _snakeX, y: _snakeY});

    while(_snake.length > _tail){
        _snake.shift();
    }

    //Comendo a fruta
    if(fruitX == _snakeX && fruitY == _snakeY){
        //BONUS-TRACK: A cobra cresce em 1 pixel a cada fruta comida.
        _tail++;
        //Pontos ganhos
        _score += 100;
        //posição da nova fruta
        fruitX = Math.round(Math.random() * (400 / box)) * box + box;
        fruitY = Math.round(Math.random() * (400 / box)) * box + box;
    }
}

//Direção da movimentação da cobra
function keyPush(event){

    //Jogador 1
    if (event.keyCode == 37) {
		snakeXSpeed = -box;
        snakeYSpeed = 0;
    } 

    else if (event.keyCode == 38) {
        snakeXSpeed = 0;
        snakeYSpeed = -box;
    } 

    else if (event.keyCode == 39) {
        snakeXSpeed = box;
        snakeYSpeed = 0;
    } 
    
    else if (event.keyCode == 40) {
        snakeXSpeed = 0;
        snakeYSpeed = box;
    }
    
    //Jogador 2
    if (event.keyCode == 65) {
		_snakeXSpeed = -box;
        _snakeYSpeed = 0;
    } 

    else if (event.keyCode == 87) {
        _snakeXSpeed = 0;
        _snakeYSpeed = -box;
    } 

    else if (event.keyCode == 68) {
        _snakeXSpeed = box;
        _snakeYSpeed = 0;
    } 
    
    else if (event.keyCode == 83) {
        _snakeXSpeed = 0;
        _snakeYSpeed = box;
	}
}

//funções gerais para desenho dos elementos estáticos
function rect(x, y, w, h, cor) {
	context.fillStyle = cor;
	context.fillRect(x, y, w, h);
}

function text(txt, fnt, x, y, cor) {
	context.fillStyle = cor;
	context.font = fnt;
	context.fillText(txt, x, y);
}