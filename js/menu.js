var context;
var canvas;
	
canvas = document.getElementById("menu");
context = canvas.getContext("2d");

function draw(){
	rect(0, 0, 300, 500, 'black');
	text('iniciar', '48px Gameplay', 20, 20, 'white');
	
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
