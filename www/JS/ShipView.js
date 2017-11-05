function ShipView(CreateShipViewUpdate){
    this.uid = CreateShipViewUpdate.uid;
    this.shipContainer = new PIXI.Container();
    this.AddPartsToContainer(CreateShipViewUpdate.parts);
    app.stage.addChild(this.shipContainer);
}
this.AddPartsToContainer = function(newShipView){
  var allParts = [];
  for(index1 = 0; index1<5;index1++){
    allParts.push(new Array());
    for(index2 = 0; index2<5;index2++){
      allParts[index1].push(undefined);
    }
  }
  var pSize = newShipView.moduleSize;
  for(var indexParts = 0; indexParts < newShipView.parts.length; indexParts++){
    var curPart = newShipView.parts[indexParts];
    allParts[curPart.x/pSize][curPart.y/pSize] = allPartTextures[curPart.object.x][curPart.object.y]
  }

  for(var index1 = 0; index1<5;index1++){
    for(var index2 = 0; index2<5;index2++){
      if(allPartTextures[index1][index2] != undefined){
        var selectedTexture = allPartTextures[index1][index2];
        var partSprite = new PIXI.Sprite(selectedTexture);

        partSprite.height = pSize;
        partSprite.width = pSize;

        partSprite.y = (index1 * partSprite.height);
        partSprite.x = (index2 * partSprite.width);

        this.shipContainer.addChild(partSprite);
      }
    }
  }
  this.shipContainer.pivot.x = 15;
  this.shipContainer.pivot.y = 15;
  this.UpdateCheck(newShipView);
}
this.UpdateCheck = function(ShipViewUpdateCheck){
    if(ShipViewUpdateCheck.uid == this.uid){
      this.shipContainer.x = ShipViewUpdateCheck.x;
      this.shipContainer.y = ShipViewUpdateCheck.y;
      this.shipContainer.rotation = newShipView.angle;
    }
}
this.DisconectCheck = function(ShipViewDiscconectCheck){
    if(ShipViewDiscconectCheck.uid == this.uid){
      app.stage.removeChild(this.shipContainer)
      var ownIndex = game.shipViews.indexOf(this);
      game.shipViews.splice(ownIndex, 1);
    }
}
