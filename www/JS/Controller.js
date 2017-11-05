window.ondevicemotion = function(event) {
    ax = event.accelerationIncludingGravity.x
    ay = event.accelerationIncludingGravity.y
    az = event.accelerationIncludingGravity.z
    rotation = event.rotationRate;
    if (rotation != null) {
      arAlpha = Math.round(rotation.alpha);
      arBeta = Math.round(rotation.beta);
      arGamma = Math.round(rotation.gamma);
      //document.write(rotation.alpha + ", " + rotation.arBeta + ", " + rotation.gamma);
    }   
}

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
}

function Go() {
    alert("go");
    launchIntoFullscreen(document.documentElement);
}

function Fire() {
    alert("fire")
    launchIntoFullscreen(document.documentElement);
}
