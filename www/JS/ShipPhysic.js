function ShipPhysic(uid, x, y, pSize, createShip){
  var parts = createShip.parts;

  this.uid = uid;
  this.thrust = createShip.power;
  this.turnVal = createShip.turn;
  this.maxVel = 5;
  this.shipCompoundBody;
  this.airFriction;
  this.mass = createShip.weight;
  this.health = createShip.health;

  this.isThrusting;
  //set stuff up
  var boxes = this.BuildBoxArray(pSize, parts);
  this.shipCompoundBody = Body.create({
    parts: boxes,
    frictionAir: this.airFriction,
    mass: this.mass
  })

  //
  World.add(world, this.shipCompoundBody);
}
this.BuildBoxArray = function(pSize, parts){
    var boxes = [];
    var allParts = [];
    for(index1 = 0; index1<5;index1++){
      allParts.push(new Array());
      for(index2 = 0; index2<5;index2++){
        allParts[index1].push(undefined);
      }
    }

    for(var indexParts = 0; indexParts < parts.length; indexParts++){
      var curPart = parts[indexParts];
      allParts[curPart.x/pSize][curPart.y/pSize] = new Object();
    }

    for(var index1 = 0; index1<5;index1++){
      for(var index2 = 0; index2<5;index2++){
        if(allParts[index2][index1] != undefined){
          boxes.push(new Bodies.rectangle((index2 * pSize), (index1 * pSize), pSize, pSize));
        }
      }
    }
    return boxes;
}
this.CreateShipViewUpdate() = function(){
  var createdUpdate = new ShipViewUpdate();
  createdUpdate.uid = this.uid;
  createdUpdate.x = shipCompoundBody.position.x;
  createdUpdate.y = shipCompoundBody.position.y;
  createdUpdate.angle = shipCompoundBody.angle;
}
this.CheckThrustBool() = function(uid, thrustingBool){
  if(uid == this.uid){
    this.isThrusting = thrustingBool;
  }
}
this.CheckTurn() = function(uid, gyroVal){
  if(uid == this.uid){
    Body.setAngularVelocity(this.shipCompoundBody, this.turnVal * gyroVal);
  }
}
this.Update() = function(){
    if((this.shipCompoundBody.speed < maxVel) && this.isThrusting){
      console.log("applyingForce");
      var adjacent = Math.cos(this.shipCompoundBody.angle) * this.thrust;
      var opposite = -1 * Math.sin(this.shipCompoundBody.angle) * this.thrust;
      var createdVector = new Vector2D(opposite, adjacent);
      createdVector = createdVector.Scale(-1);

      Body.applyForce(this.shipCompoundBody, this.shipCompoundBody.position, { x: createdVector.x, y: createdVector.y});
    }else{
      console.log("maxVel");
    }
}
