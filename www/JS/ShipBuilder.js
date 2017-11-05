var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var xp = 0;
var xpI = 100;

var parts = new Image();
var objectsCounts = [1, 6, 3, 6, 4];
var tileSize = 6;
var typeAmount = 4;
var selectedType = 0;
var selectedObj = "0001";
var lastTex = [2,2];
var delet = false;

var board = {
    width: 5,
    height: 5,
    margin: 0,
    closedC: "rgb(2,47,75)",
    openC: "rgb(15, 252, 245)",
    lineWidth: "1",
    tex: new Array()
}

// Initialize Starting Variables
function Initialize() {
    canvas.width  = (window.innerWidth / 5) * 3;
    canvas.height = window.innerHeight; 
    canvas.style.width  = canvas.width;
    canvas.style.height = canvas.height;

    // Initialize board array
    for(var i = 0; i < board.width; i++) {
        board.tex[i] = new Array();
        for(var j = 0; j < board.height; j++){  
            board.tex[i][j] = "";
        }
    }

    parts.src = "Sprites/parts.png";
    SetObject(Math.floor(board.width / 2), Math.floor(board.height / 2))
    selectedObj = "1001";    
    SetType(4);    
    parts.onload = DrawBoard;
}

// Draw the building board
function DrawBoard() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var sec = canvas.height / board.height;
    var start = (canvas.width - sec * 4) / 4;
    var dim = sec - board.margin * board.height;
    for(var i = 0; i < board.width; i++) {
        for(var j = 0; j < board.height; j++) {  
            if(board.tex[i][j] == "") {
                ctx.beginPath();
                ctx.fillStyle = board.closedC;
                ctx.fillRect(sec*i + start + dim/3, sec*j + dim/3, dim/3, dim/3);
                ctx.stroke();
            }    
            else if(board.tex[i][j] == "o") {
                ctx.beginPath();
                ctx.fillStyle = board.openC;
                ctx.fillRect(sec*i + start + dim/3, sec*j + dim/3, dim/3, dim/3);
                ctx.stroke();
            }
            else { 
                var r = board.tex[i][j][0];
                var c = board.tex[i][j][1];
                var rot = board.tex[i][j][2];
                var sc = board.tex[i][j].substr(3, board.tex.length - 3);
                var newDim = dim + board.margin * 4;
                ctx.save();
                if(i != Math.floor(board.width/2) || j != Math.floor(board.height/2)) {
                    ctx.translate(sec * i + start - board.margin*2 + newDim/2,sec * j - board.margin*2  + newDim/2);
                    ctx.rotate(90*rot*Math.PI/180);
                    ctx.scale(sc,1);
                    ctx.translate(-(sec * i + start - board.margin*2 + newDim/2),-(sec * j - board.margin*2 + newDim/2));
                }                
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(parts, c*tileSize, r*tileSize, tileSize, tileSize,
                     sec * i + start - board.margin*2,sec * j - board.margin*2,newDim,newDim);
                ctx.restore();
            }               
        }
    }
}

// Sets the object at r, c to the selected object
function SetObject(r, c) {
    board.tex[r][c] = selectedObj;
    SetSurroundings(r + 1, c);
    SetSurroundings(r - 1, c);
    SetSurroundings(r, c + 1);
    SetSurroundings(r, c - 1);
}

// Sets non taken surrounding objects to open
function SetSurroundings(r, c) {
    if(board.tex[r] != null){
        if(board.tex[r][c] != null && board.tex[r][c] == "") {
            board.tex[r][c] = "o";
        }
    }
}

// Checks weather a cell is being touched
function FindCellTouched(x, y) {
    var sec = canvas.height / board.height;
    var start = (canvas.width - sec * 4) / 4;
    var dim = (sec - board.margin * board.height);
    for(var i = 0; i < board.width; i++) {
        for(var j = 0; j < board.height; j++) {  
            var rx = sec * i + start;
            var ry = sec * j;
            if(x > rx && x < rx + dim && y > ry && y < ry + dim && board.tex[i][j] != "" && 
                (i != Math.floor(board.width/2) || j != Math.floor(board.height/2))) {
                lastTex[0] = i;
                lastTex[1] = j;
                return [i,j];
            }
        }
    }
}

// Sets the selected type to type selected in gui
function SetType(type) {
    delet = false;
    selectedType = type;
    ResetPartsGUI();    
    CreatePartGUI();
}

// Remove all children in parts div
function ResetPartsGUI() {
    var buttonContainer = document.getElementById('PartSelection');
    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
    }
}

// Creates the parts GUI
function CreatePartGUI() {
    for(var i = 0; i < objectsCounts[selectedType]; i++) {
        var buttonContainer = document.getElementById('PartSelection');

        var button = document.createElement('button');
        button.id = i;
        button.onclick = function () {
            delet = false;
            selectedObj = selectedType + "" + this.id + "0" + "-1";
        };
        buttonContainer.appendChild(button);
        
        var image = document.createElement('img');
        image.style.width = button.offsetWidth*6+ "px";
        image.style.height = button.offsetHeight*5 + "px";
        image.style.left = -button.offsetWidth*(i) +"px"; 
        image.style.top = -button.offsetHeight*(selectedType) +"px";
        image.style.position = "absolute";
        image.src = "Sprites/parts.png";
        button.appendChild(image);
    }
}

//Rotates selected object
function RotateObj() {
    delet = false;
    if(lastTex[0] != Math.floor(board.width/2) || lastTex[1] != Math.floor(board.height/2)){
        console.log(Math.floor(board.tex.width/2))
        var newRot = selectedObj[2];
        if(newRot < 3) {
            newRot++;
        }
        else {
            newRot = 0;
        }  
        selectedObj = selectedObj.substr(0,2) + newRot + selectedObj.substr(3, selectedObj.length - 3);
        SetObject(lastTex[0], lastTex[1]);
        DrawBoard();
    }
}

// Mirror
function MirrorObj() {
    delet = false;
    if(lastTex[0] != Math.floor(board.width/2) || lastTex[1] != Math.floor(board.height/2)){
        var mirror = selectedObj.substr(3, selectedObj.length - 3);
        mirror *= -1;
        selectedObj = selectedObj.substr(0,3) + mirror;
        SetObject(lastTex[0], lastTex[1]);
        DrawBoard();
    }
}

// Deletes Object
function Delete() {
    delet = true;
}

// Comfirm
function Confirm() {
    document.getElementById('GUI').style.display = "none";
    document.getElementById('Controller').style.display = "block";
}

canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    var cell = FindCellTouched(x, y);  
    if(cell != null) {
        var r = cell[0];
        var c = cell[1];
        if(delet && !(board.tex[r + 1][c].length > 1 && board.tex[r - 1][c].length > 1
            && board.tex[r][c + 1].length > 1 && board.tex[r][c - 1].length > 1)) {
            board.tex[r][c] = "o";
            if(board.tex[r + 1][c] == "o") {
                board.tex[r + 1][c] = "";
            }
            if(board.tex[r - 1][c] == "o") {
                board.tex[r - 1][c] = "";
            }
            if(board.tex[r][c + 1] == "o") {
                board.tex[r][c + 1] = "";
            }
            if(board.tex[r][c - 1] == "o") {
                board.tex[r][c - 1] = "";
            }
        }
        else {
            SetObject(cell[0], cell[1]);
        }       
        
    }
    DrawBoard();
}, false);
window.onclick = function(){
    launchIntoFullscreen(document.documentElement);
}
Initialize();