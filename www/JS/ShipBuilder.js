var canvas = document.getElementById("canvas");
console.log(canvas);
var ctx = canvas.getContext('2d');

var objects = new Array();
var typeAmount = 3;
var selectedType = 0;
var selectedObj = "placeholdership.png";

var board = {
    width: 5,
    height: 5,
    margin: 5,
    closedC: "#0042FF",
    openC: "#FFF300",
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

    // Initialize objects array
    for(var i = 0; i < typeAmount; i++) {
        // 0 - Engine / 1 - Hull / 2 - Weapons
        objects[i] = new Array();

        //Temp
        objects[i][0] = "placeholdership.png";
    } 
    
    // Current object
    selectedObj = objects[0][0];
    SetObject(Math.floor(board.width / 2), Math.floor(board.height / 2))
    SetType(0);    
}

// Draw the building board
function DrawBoard() {
    var sec = canvas.height / board.height;
    var start = (canvas.width - sec * 4) / 4;
    var dim = sec - board.margin * board.height;
    for(var i = 0; i < board.width; i++) {
        for(var j = 0; j < board.height; j++) {  
            if(board.tex[i][j] == "") {
                ctx.strokeStyle = board.openC;
                ctx.lineWidth = board.lineWidth;
                ctx.rect(sec * i + start,sec * j,dim,dim);
                ctx.stroke();
            }    
            else if(board.tex[i][j] == "o") {
                ctx.strokeStyle = board.closedC;
                ctx.lineWidth = board.lineWidth;
                ctx.rect(sec * i + start,sec * j,dim,dim);
                ctx.stroke();
            }
            else { 
                var img = new Image();
                var newDim = dim + board.margin * 4;
                img.src ="Sprites/" + board.tex[i][j];
                ctx.drawImage(img, sec * i + start - board.margin*2,sec * j - board.margin*2,newDim,newDim);
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
            if(x > rx && x < rx + dim && y > ry && y < ry + dim && board.tex[i][j] == "o") {
                return [i,j];
            }
        }
    }
}

// Sets the selected type to type selected in gui
function SetType(type) {
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
    for(var i = 0; i < objects[selectedType].length; i++) {
        var buttonContainer = document.getElementById('PartSelection');

        var button = document.createElement('button');
        button.id = 'button1';
        button.onclick = function () {
            selectedObj = objects[selectedType][button.id[button.id.length - 1]];
        };
        buttonContainer.appendChild(button);
        
        var image = document.createElement('img');
        image.setAttribute('scr', "Sprites/" + objects[selectedType][button.id[button.id.length - 1]]);
        button.appendChild(image);
    }
}



Initialize();
DrawBoard();

function Update() {
    
    //console.log(selectedObj);

    
    requestAnimationFrame(Update);
}

Update();

canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var cell = FindCellTouched(x, y);
    console.log(board.tex);
    if(cell != null)
        SetObject(cell[0], cell[1]);
    DrawBoard();
}, false);

