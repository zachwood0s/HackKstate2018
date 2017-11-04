var canvas = document.getElementById("canvas");
console.log(canvas);
var ctx = canvas.getContext('2d');

var board = {
    width: 5,
    height: 5,
    margin: 5,
    tex: new Array()
}

function Initialize() {
    canvas.width  = (window.innerWidth / 5) * 3;
    canvas.height = window.innerHeight; 
    canvas.style.width  = canvas.width;
    canvas.style.height = canvas.height;

    for(var i = 0; i < board.width; i++) {
        board.tex[i] = new Array();
        for(var j = 0; j < board.height; j++){  
            board.tex[i][j] = 0;
        }
    }
}

function DrawBoard() {
    var sec = canvas.height / board.height;
    var start = (canvas.width - sec * 4) / 4;
    var dim = sec - board.margin * board.height;
    for(var i = 0; i < board.width; i++) {
        for(var j = 0; j < board.height; j++) {  
            if(board.tex[i][j] == 0) {
                ctx.fillRect(sec * i + start,sec * j,dim,dim);
            }    
            else { 
                ctx.drawImage(image, sec * i + start,sec * j,dim,dim);
            }               
        }
    }
}

Initialize();
DrawBoard();