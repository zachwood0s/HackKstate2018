var socket = io();
var app = new PIXI.Application(400, 400, {backgroundColor : 0x1099bb});
  document.body.appendChild(app.view);

var gameState = function(){

    this.ships = [];
    this.bullets = [];
}
var game = new gameState();
window.onload=function(){
    socket.emit("pairScreen");
}
socket.on("onserverupdate", function(data){=
    update(data.ships);
});
socket.on("onplayerdisconnected", function(uid){
  for(var deleteIndex = 0; deleteIndex < this.ships.length; deleteIndex++){
    var selectedDeleteShip = this.ships(deleteIndex);
    if(selectedDeleteShip.uid == uid){
      app.stage.removeChild(selectedDeleteShip);
    }
  }
});

function update(shipsFromPhysics){

    for(var physicsShipIndex = 0; physicsShipIndex < shipsFromPhysics.length; physicsShipIndex++){
      var flag = false;
      var selectedShipFromPhy = shipsFromPhysics[physicsShipIndex];
      for(var heldShipIndex = 0; heldShipIndex < game.ships.length; heldShipIndex++){
        var heldShip = game.ships[heldShipIndex];
        if(heldShip.uid == selectedShipFromPhy.uid){
          flag = true;
          heldShip.shipContainer.x = selectedShipFromPhy.shipCompoundBody.position.x;
          heldShip.shipContainer.y = selectedShipFromPhy.shipCompoundBody.position.y;
          break;
        }

        //app.stage.addChild(selectedShipContainer);
      }
      if(flag == false){
        app.stage.addChild(selectedShipFromPhy.shipContainer);
      }
    }
}
