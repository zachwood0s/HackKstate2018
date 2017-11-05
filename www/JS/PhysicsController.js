function PhysicsController(windowWidthIn, windowHeightIn){

  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  var engine;
  var world;


  this.ShipPhysicArray = [];

  engine = Engine.create();
  world = engine.world;
  engine.world.gravity.y = 0;

  Engine.run(engine);
}

this.AddShipPhysic(uid, x, y, pSize, createShip){
  this.ShipPhysicArray.push(new ShipPhysic(uid, x, y, pSize, createShip));
}

Events.on(engine, 'beforeUpdate', function(event) {
  for(var indexShipPhysicsArray = 0; indexShipPhysicsArray < this.ShipPhysicArray.length; indexShipPhysicsArray++){
    var selectedShipPhysics = this.ShipPhysicArray[indexShipPhysicsArray];
    selectedShipPhysics.Update();
  }
}
this.TurnShip(uid, gyro){
  for(var indexShipPhysicsArray = 0; indexShipPhysicsArray < this.ShipPhysicArray.length; indexShipPhysicsArray++){
    var selectedShipPhysics = this.ShipPhysicArray[indexShipPhysicsArray];
    selectedShipPhysics.CheckTurn(uid, gyro);
  }
}

this.SetThrustBool(uid, thrustingBool){
  for(var indexShipPhysicsArray = 0; indexShipPhysicsArray < this.ShipPhysicArray.length; indexShipPhysicsArray++){
    var selectedShipPhysics = this.ShipPhysicArray[indexShipPhysicsArray];
    selectedShipPhysics.CheckThrustBool(uid, thrustingBool);
  }
}
