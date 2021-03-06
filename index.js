global.window = global.document = global;


var frame_time = 60/1000; // run the local game at 16ms/ 60hz
if('undefined' != typeof(global)) frame_time = 16; //on server we run at 45ms, 22hz

( function () {

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( !window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
    }

}() );

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);


GameState = function(){
    this.uidLength = 4;
    this.players = [];
    this.bullets = [];
    this.uids = [];
    this.numPlayers = 0;

    this.serverTime= 0;
    this.lastState= {};
    this.dt = 0;
    this.lastFrameTime = 0;
    this.localTime = 0.016;

    this.CreateTimer();

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

GameState.prototype.Update = function(t){
    this._dt = new Date().getTime();
    this._dte = new Date().getTime();

    this.dt = this.lastFrameTime ? ((t - this.lastFrameTime)/1000.0):0.16;

    this.lastFrameTime = t;

    this.serverTime = this.localTime;

    this.lastState = {
        players: this.players,
        t: this.server_time,
    }
    //console.log("updating");
    this.UpdatePhysics();
    //for(var i = 0; i<this.players.length; i++){
    io.sockets.emit('onserverupdate', this.lastState);
    //}
    
    this.updateid = window.requestAnimationFrame(this.Update.bind(this), this.viewport);
}

GameState.prototype.CreateTimer = function(){
    setInterval(function(){
        this._dt = new Date().getTime() - this._dte;
        this._dte = new Date().getTime();
        this.localTime += this._dt/1000.0;
    }.bind(this), 4);
}


GameState.prototype.UpdatePhysics= function(){
    for(var i = 0; i<this.players.length; i++){
        this.players[i].oldState.pos = this.Pos(this.players[i].pos);
        var newDir = this.ProcessInput(this.players[i]);
        this.players[i].pos = this.vAdd(this.players[i].oldState.pos, newDir);

        //check collisions

        this.players[i].inputs = [];
    }
}

GameState.prototype.Pos = function(a){return {x:a.x, y:a.y}; };
GameState.prototype.vAdd = function(a, b){return {x: a.x+b.x, y:a.y + b.y};};

GameState.prototype.ProcessInput = function(player){
    var rotationDir = 0;
    var ic = player.inputs.length;
    if(ic){
        for(var i = 0; i<ic; i++){
            if(player.inputs[i].seq <= player.lastInputSeq) continue;

            var input = player.inputs[i].inputs;

            var rotation=input.rotation;
            var firing = input.firing;
            var boosting = input.boosting;

            //Apply rotation;
            if(rotation != 0){
                console.log(player.uid+"Rotation: "+rotation);
            }

            //Create bullets out of ship;
            if(firing){
                console.log(player.uid+"Firing: "+firing);
            }

            //Apply move force;
            if(boosting){
                console.log(player.uid+"Boosting: "+boosting);
            }
        }
    }

    var resultingVector = {
        x: rotationDir*10,
        y: 0
    }
    if(player.inputs.length){
        player.lastInputTime = player.inputs[ic-1].time;
        player.lastInputSeq = player.inputs[ic-1].seq;
    }
    return resultingVector;
}

GamePlayer = function(uid){
    this.uid = uid;

    this.pos = {x:0, y:0};
    this.ship = {};
    this.oldState = {pos:{x:0, y:0}};
    this.curState = {pos:{x:0, y:0}};
    this.stateTime = new Date().getTime();

    this.inputs = [];
}


app.use(express.static(__dirname+'/www'))
app.get('/', function(req, res){
    res.sendFile(__dirname+'/www/index.html');
});
app.get('/controller', function(req, res){
    res.sendFile(__dirname+'/www/shipBuilder.html');
})
app.get('/screen/', function(req, res){
    res.sendFile(__dirname+"/www/screen.html");
})



var game = new GameState();


io.on('connection', function(socket){
    console.log('a user connected')
    //var uid = game.GenerateUid();
    //console.log('assigning uid: '+ uid);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        if(socket.uid != undefined){
            game.players = game.players.filter(function(pl){
                return pl.uid !== socket.uid;
            });
            game.numPlayers--;
            io.sockets.emit("enplayerdisconnected", socket.uid);
        }
    });

    /**
     * Controller Events
     */
    socket.on('createController', function(){
        var uid = game.GenerateUid();
        game.uids.push(uid);

        console.log("creating controller with uid "+uid);
        socket.uid = uid;

        var player = new GamePlayer(uid);
        //game.Update(new Date().getTime());
        game.players.push(player);
        game.numPlayers++;
        console.log(game.numPlayers+" players have joined");
        if(game.numPlayers == 1){
            console.log("starting game");
            game.Update(new Date().getTime());
        }
        socket.emit("connected", uid);
    });


    socket.on('receiveInput', function(controllerCode, input, inputTime, inputSeq){
        var player = game.players.find(function(p){
            //console.log(p.uid);
            return p.uid == controllerCode;
        });
       //console.log("receiving input from " +controllerCode);
        if(player != undefined){
            player.inputs.push({inputs:input, time:inputTime, seq:inputSeq});
        }
    });

    /**
     * Screen Events
     */
    socket.on('pairScreen', function(){
        console.log("a screen has been paired");
    })

});

http.listen(8080, function(){
    console.log("listening on *:8080");
});