function ship(x, y, w, h, texture) {
  this.body = Bodies.rectangle(x, y, w, h);
  World.add(world, this.body);

  this.show = function() {

  }
}
