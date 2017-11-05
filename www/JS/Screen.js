var socket = io();
var app = new PIXI.Application(400, 400, {backgroundColor : 0x1099bb});
  document.body.appendChild(app.view);
var allPartTextures = ReadSpriteSheet();

var gameState = function(){
    this.shipViews = [];
}

var game = new gameState();

window.onload=function(){
    socket.emit("pairScreen");
}
socket.on("onserverupdate", function(ShipViewUpdateArray){
    for(var indexUpdate = 0; indexUpdate < ShipViewUpdateArray.length;indexUpdate++){
      var viewUpdate = ShipViewUpdateArray[indexUpdate];
      for(var indexShipView = 0; indexShipView < game.shipViews.length; indexShipView++){
        game.shipViews[indexShipView].UpdateCheck(viewUpdate);
      }
    }
});
socket.on("onplayerdisconnected", function(ShipViewUpdateDisconnect){
  for(var indexShipDisconnect = 0; indexShipDisconnect < game.shipViews.length; indexShipDisconnect++){
    game.shipViews[indexShipDisconnect].DisconectCheck(viewUpdate);
  }

});
socket.on("oncreateship", function(newShipViewUpdate){
  this.shipViews.push(new ShipView(newShipViewUpdate));
});

function ReadSpriteSheet(){
  var spriteSheetImage = PIXI.BaseTexture.fromImage("Sprites/parts.png");
  var allTextures = [];
  for(var curImgCol = 0; curImgCol < 6; curImgCol++){
    allTextures.push(new Array());
    for(var curImgRow = 0; curImgRow < 5; curImgRow++){
      var rect = new PIXI.Rectangle((curImgCol*6), (curImgRow*6), 6, 6);
      allTextures[curImgCol].push(new PIXI.Texture(spriteSheetImage, rect));
    }
  }
  return allTextures;
}
