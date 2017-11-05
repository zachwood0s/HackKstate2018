window.addEventListener("devicemotion", handleMotionEvent, true);

function handleMotionEvent() {
    var y = event.accelerationIncludingGravity.y;
    y = y/2;
    if(y > 1)
        y = 1;
    y = Math.round(y *10) /10;
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
    //launchIntoFullscreen(document.documentElement);
}

function Fire() {
    alert("fire")
    //launchIntoFullscreen(document.documentElement);
}
