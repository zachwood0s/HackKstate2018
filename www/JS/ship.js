function ship(X, Y, TEX) {
  this.uid;
  this.shipContainer = new PIXI.Container();

  this.shipCompoundBody;

  const thrust = .05;
  const turnVal = .2;
  const maxVel = 5;

  this.allParts = [];


  for(index1 = 0; index1<5;index1++){
    var col = [];
    for(index2 = 0; index2<5;index2++){
      col.push(undefined);
    }
    this.allParts.push(col);
  }
  /*
  this.allParts[0][0] = TEX;
  */
  this.allParts[2][1] = TEX;
  this.allParts[2][2] = TEX;
  this.allParts[2][3] = TEX;

  var boxes = [];

  for(var index1 = 0; index1<5;index1++){
    for(var index2 = 0; index2<5;index2++){
      if(this.allParts[index1][index2] != undefined){
        var cur = this.allParts[index1][index2];
        var partSprite = new PIXI.Sprite(cur);
        //partSprite.anchor.set(0.5);
        partSprite.y = (index1 * 6);

        partSprite.x = (index2 * 6);

        this.shipContainer.addChild(partSprite);

        var partBox = Bodies.rectangle((index2 * 6),(index1 * 6),  6, 6);
        console.log("Build: ", partBox.position.x, partBox.position.y);
        boxes.push(partBox);
      }
    }
  }

  var partA = boxes[0];
  var partB = boxes[1];

  this.shipCompoundBody = Body.create({
    parts: boxes,
    frictionAir: .05,
    mass: 5,
    //xOffset: 15,//this.shipContainer.width / 2,
    //yOffset: 15//this.shipContainer.height / 2,
  });


  Body.setPosition(this.shipCompoundBody, {x: X, y: Y});
  //this.shipCompoundBody.position.y = Y;
  console.log(X, Y);
  console.log(this.shipCompoundBody.position);
  this.shipContainer.pivot.x = 15;//this.shipContainer.width / 2;
  this.shipContainer.pivot.y = 15;//this.shipContainer.height / 2;

  World.add(world, this.shipCompoundBody);
    console.log(X, Y);
  console.log(this.shipCompoundBody.position);

  this.Show = function() {
    //console.log(this.shipCompoundBody.position);
    //console.log(this.shipContainer);

    var xPos = this.shipCompoundBody.position.x;
    var yPos = this.shipCompoundBody.position.y;
    //console.log("show: ", this.shipCompoundBody, this.shipContainer)
    this.shipContainer.x = xPos//-this.shipContainer.width/2;
    this.shipContainer.y = yPos//-this.shipContainer.height/2;

    this.shipContainer.rotation = this.shipCompoundBody.angle;
    return this.shipContainer;
  }

  this.Forward = function() {
    console.log("forward");
    if(this.shipCompoundBody.speed < maxVel)
    {
      console.log("applyingForce");
      var adjacent = Math.cos(this.shipCompoundBody.angle) * thrust;
      var opposite = -1 * Math.sin(this.shipCompoundBody.angle) * thrust;
      var createdVector = new Vector2D(opposite, adjacent);
      createdVector = createdVector.Scale(-1);

      Body.applyForce(this.shipCompoundBody, this.shipCompoundBody.position, { x: createdVector.x, y: createdVector.y});
    }else{
      console.log("maxVel");
    }
  }
  this.Left = function() {
    console.log("Left");
    Body.setAngle(this.shipCompoundBody, this.shipCompoundBody.angle - .2);
  }
  this.Right = function() {
    console.log("Right");
    Body.setAngle(this.shipCompoundBody, this.shipCompoundBody.angle + .2);
  }
}
