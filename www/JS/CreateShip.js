var tex = new Array();
var size = 6;
var partSize = 10;

function Object(type, x, y, health, turn, power, weight) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.health = health;
    this.turn = turn;
    this.power = power;
    this.weight = weight
}

function Part(x, y, rot, mir, object) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.mir = mir;
    this.object = object;
}

function ShipBlue() {
    this.parts = new Array();
    this.power = 0;
    this.health = 0;
    this.turn = 0;
    this.weight = 0;
}

function CreateObjects() {
    var objects = new Array();
    // health - turn - power - weight
    objects.push(new Object("Core", 0, 0, 100, 3, 2, 5));
    objects.push(new Object("Engine", 0, 24, 10, 0, 6, 2));
    objects.push(new Object("Engine", 6, 24, 10, 0, 6, 2));
    objects.push(new Object("Engine", 12, 24, 10, -3, 10, 3));
    objects.push(new Object("Engine", 18, 24, 10, -3, 10, 3));
    objects.push(new Object("Hull", 0, 6, 200, -2, 0, 8));
    objects.push(new Object("Hull", 6, 6, 200, -2, 0, 8));
    objects.push(new Object("Hull", 12, 6, 200,-2, 0, 8));
    objects.push(new Object("Hull", 18, 6, 150, -1, 0, 6));    
    objects.push(new Object("Hull", 24, 6, 150, -1, 0, 6));
    objects.push(new Object("Hull", 30, 6, 150, -1, 0, 6));
    objects.push(new Object("Wing", 0, 12, 20, 9, 0, 2));
    objects.push(new Object("Wing", 6, 12, 30, 10, 0, 3));
    objects.push(new Object("Wing", 12, 12, 10, 8, 0, 1)); 
    objects.push(new Object("Weapons", 0, 18, 0, -4, 0, 3)); 
    objects.push(new Object("Weapons", 6, 18, 0, -4, 0, 3)); 
    objects.push(new Object("Weapons", 12, 18, 0, -4, 0, 3)); 
    objects.push(new Object("Weapons", 18, 18, 0, -4, 0, 3)); 
    objects.push(new Object("Weapons", 24, 18, 0, -4, 0, 3)); 
    objects.push(new Object("Weapons", 30, 18, 0, -4, 0, 3));  
    return objects;
}

function CreateShip(pSize){
    var objects = CreateObjects();
    var ship = new ShipBlue();
    for(var i = 0; i < tex.length; i++) {
        for(var j = 0; j < tex[i].length; j++) {
            var y = tex[i][j][0]*size;
            var x = tex[i][j][1]*size;
            var rot = tex[i][j][2];
            var mir = tex[i][j].substr(3, tex[i][j].length - 3);
            for(var z = 0; z < objects.length; z++) {           
                if(objects[z].x == x && objects[z].y == y) {
                    var part = new Part(i*pSize, j*pSize, rot, mir, objects[z]);
                    ship.power += objects[z].power;
                    ship.health += objects[z].health;
                    ship.turn += objects[z].turn;
                    ship.weight += objects[z].weight;
                    ship.parts.push(part);
                }   
            }
        }
    }
    return ship;
}