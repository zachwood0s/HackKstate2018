function ship(X, Y, W, H, TEX) {
  const thrust = .05;
  const turnVal = .2;
//, { frictionAir: 0.1}
  this.shipBox = Bodies.rectangle(X, Y, W, H, { frictionAir: 0.1});
  Body.setMass(this.shipBox, 10);
  console.log(world);
  console.log("shipBox: " + this.shipBox);
  World.add(world, this.shipBox);

  this.shipSprite = new PIXI.Sprite(TEX);
  this.shipSprite.anchor.set(0.5);
  app.stage.addChild(this.shipSprite);

  this.Show = function() {
    this.shipSprite.x = this.shipBox.position.x;
    this.shipSprite.y = this.shipBox.position.y;
    this.shipSprite.rotation = this.shipBox.angle;
  }

  this.Forward = function() {
    var adjacent = Math.cos(this.shipBox.angle) * thrust;
    var opposite = -1 * Math.sin(this.shipBox.angle) * thrust;
    var createdVector = new Vector2D(opposite, adjacent);
    createdVector = createdVector.Scale(-1);
    Body.applyForce(this.shipBox, this.shipBox.position, { x: createdVector.x, y: createdVector.y});
  }
  this.Left = function() {
    Body.setAngle(this.shipBox, this.shipBox.angle - .2);
  }
  this.Right = function() {
    Body.setAngle(this.shipBox, this.shipBox.angle + .2);
  }
}
