window.addEventListener('touchenter', function(event) {
    //var x = event.pageX - window.offsetLeft;
    alert(e.changedTouches[0].pageX)
    //document.write("asdfa");
    //document.getElementById('text').innerHTML = "text";

    /*if(x < window.innerWidth/2) {
        console.log("engine");
    }
    else {
        console.log("fire");
    }*/
    e.preventDefault()
}, false);

window.addEventListener('keydown', function(event) {

    if(event.keyCode == 65) {
        console.log("rotate left");
    }
    else if(event.keyCode == 68) {
        console.log("rotate right");
    }
    
}, false);


window.ondevicemotion = function(event) {
    ax = event.accelerationIncludingGravity.x
    ay = event.accelerationIncludingGravity.y
    az = event.accelerationIncludingGravity.z
    rotation = event.rotationRate;
    //document.write("asd");
    if (rotation != null) {
      arAlpha = Math.round(rotation.alpha);
      arBeta = Math.round(rotation.beta);
      arGamma = Math.round(rotation.gamma);
      //document.write(arAlpha);
    }
    
  }
