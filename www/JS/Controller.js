  var socket = io();
  var keys = [];
  var inputSeq = 0;
  var controllerCode = "";
  var firing = false;
  var boosting =false;
  var rotation = 0;
  function update(){
      handleInput()
      window.requestAnimationFrame(update);
  }
  window.onload = function(){
      socket.emit("createController");
  }

  socket.on('connected', function(uid){
      console.log(uid);
      controllerCode = uid;
      update();
  });

  function handleInput(){
      var input = {}; 
      if(firing){
          input.firing = true;
      }
      if(boosting){
          input.boosting = true;
      }
      input.rotation = rotation;

      //console.log(input);
      if(input && controllerCode != ""){
          inputSeq += 1;
          socket.emit("receiveInput", controllerCode, input, new Date().getTime(), inputSeq);
      }
  }
  window.addEventListener("devicemotion", handleMotionEvent, true);

  function handleMotionEvent() {
      var y = event.accelerationIncludingGravity.y;
      y = y/2;
      if(y > 1)
          y = 1;
      else if(y < -1)
          y = -1;
      y = Math.round(y *10) /10;
      rotation = y;
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
  function StartGo(){
    boosting = true;
    console.log("started touch");
  }
  function EndGo(){
    boosting = false;
    console.log("end touch");
  }

  function StartFire(){
    firing = true;
  }
  function EndFire(){
    firing = false;
  }
