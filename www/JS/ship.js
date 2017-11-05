function ship(X, Y, TEX) {
  this.shipContainer = new PIXI.Container();
  app.stage.addChild(this.shipContainer);

  this.shipCompoundBody;

  const thrust = .05;
  const turnVal = .2;
  this.allParts = [];


  for(index1 = 0; index1<5;index1++){
    var col = [];
    for(index2 = 0; index2<5;index2++){
      col.push(undefined);
    }
    this.allParts.push(col);
  }

  this.allParts[0][0] = TEX;
  this.allParts[0][1] = TEX;
  var boxes = [];

  for(var index1 = 0; index1<5;index1++){
    for(var index2 = 0; index2<5;index2++){
      if(this.allParts[index1][index2] != undefined){
        var cur = this.allParts[index1][index2];
        var partSprite = new PIXI.Sprite(cur);
        partSprite.anchor.set(0.5);
        partSprite.y = (index1 * 18);

        partSprite.x = (index2 * 13);

        this.shipContainer.addChild(partSprite);

        var partBox = Bodies.rectangle((index1 * 13) + X, (index2 * 18) + Y,  13, 18);
        boxes.push(partBox);
      }
    }
  }

  //this.shipContainer.anchor.set(.5);

  var partA = boxes[0];
  var partB = boxes[1];

  this.shipCompoundBody = Body.create({
    parts: [partA, partB],
    frictionAir: .05,
    mass: 5,
    xOffset: this.shipContainer.width / 2,
    yOffset: this.shipContainer.height / 2,
  });

  this.shipCompoundBody.x = X;
  this.shipCompoundBody.y = Y;
  this.shipContainer.pivot.x = this.shipContainer.width / 2;
  this.shipContainer.pivot.y = this.shipContainer.height / 2;
  //console.log(this.shipCompoundBody);

  //this.shipBox = Bodies.rectangle(X, Y, W, H, { frictionAir: 0.1});
  //Body.setMass(this.shipBox, 10);
  //console.log(world);
  //console.log("shipBox: " + this.shipBox);
  //World.add(world, this.shipBox);

  //this.shipSprite = new PIXI.Sprite(TEX);
  //this.shipSprite.anchor.set(0.5);
  //app.stage.addChild(this.shipSprite);
  World.add(world, this.shipCompoundBody);


  this.Show = function() {
    //this.shipSprite.x = this.shipBox.position.x;
    //this.shipSprite.y = his.shipBox.position.y;
    //this.shipSprite.rotation = this.shipBox.angle;

    this.shipContainer.x = this.shipCompoundBody.position.x;
    this.shipContainer.y = this.shipCompoundBody.position.y;

    this.shipContainer.rotation = this.shipCompoundBody.angle;
  }

  this.Forward = function() {
    /*
    var adjacent = Math.cos(this.shipBox.angle) * thrust;
    var opposite = -1 * Math.sin(this.shipBox.angle) * thrust;
    var createdVector = new Vector2D(opposite, adjacent);
    createdVector = createdVector.Scale(-1);
    Body.applyForce(this.shipBox, this.shipBox.position, { x: createdVector.x, y: createdVector.y});
    */
    var adjacent = Math.cos(this.shipCompoundBody.angle) * thrust;
    var opposite = -1 * Math.sin(this.shipCompoundBody.angle) * thrust;
    var createdVector = new Vector2D(opposite, adjacent);
    createdVector = createdVector.Scale(-1);

    Body.applyForce(this.shipCompoundBody, this.shipCompoundBody.position, { x: createdVector.x, y: createdVector.y});
    console.log("Sprite: ", this.shipContainer);
    console.log("Body: ", this.shipCompoundBody);
  }
  this.Left = function() {
    Body.setAngle(this.shipCompoundBody, this.shipCompoundBody.angle - .2);
    console.log("Sprite: ", this.shipContainer);
    console.log("Body: ", this.shipCompoundBody);
  }
  this.Right = function() {
    Body.setAngle(this.shipCompoundBody, this.shipCompoundBody.angle + .2);
    console.log("Sprite: ", this.shipContainer);
    console.log("Body: ", this.shipCompoundBody);
  }
}
