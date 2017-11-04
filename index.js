

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


GameState = function(){
    this.uidLength = 4;
    this.players = [];
    this.bullets = [];
    this.uids = [];
}

GameState.prototype.GetRandomCharacter= function(){
    var number = Math.round(Math.random()*26)+65;
    return String.fromCharCode(number);
}
GameState.prototype.GenerateUid = function(){
    var newUID = "";
    for(var i = 0; i<this.uidLength; i++) newUID += this.GetRandomCharacter(); 
    if(this.uids.indexOf(newUID) > -1) return this.GenerateUid();
    else return newUID;
}

GameState.prototype.Update = function(){

}

GameState.prototype.ProcessInput = function(){
    var
}

GamePlayer = function(game, uid){
    this.game = game;
    this.uid = uid;

    this.pos = {x:0, y:0};
    this.old_state = {pos:{x:0, y:0}};
    this.cur_state = {pos:{x:0, y:0}};
    this.state_time = new Date().getTime();

    this.inputs = [];
}


app.get('/', function(req, res){
    res.sendFile(__dirname+'/www/index.html');
});
app.get('/controller', function(req, res){
    res.sendFile(__dirname+'/www/shipBuilder.html');
})


var game = new GameState();

io.on('connection', function(socket){
    console.log('a user connected')
    //var uid = game.GenerateUid();
    console.log('assigning uid: '+ uid);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    /**
     * Controller Events
     */
    socket.on('createController', function(){
        var uid = game.GenerateUid();
        game.uids.push(uid);

        //create player with uid
    });
    socket.on('receiveInput', function(controllerCode, input){
        var player = game.players.find(function(p){
            return p.uid == controllerCode;
        });

        player.inputs.push(input);
    });

    /**
     * Screen Events
     */

});

http.listen(3000, function(){
    console.log("listening on *:3000");
});