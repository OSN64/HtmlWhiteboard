// need to fix the loading allow canvas click until
// dom and css are loaded its causing some unwanted
// issues like not been able to clickon the canvas
$(document).ready(function() {


  var canvas = $("#myCanvas");
  var prevCanvas = $("#previewCanvas")
  var width = canvas.width();
  var height = canvas.height();
  console.log(width + " " + height )
  canvas.drawArc({
      // draggable: true,
      fillStyle: "green",
      x: 100, y: 100,
      radius: 50
    });
  var currentAction;
  var objWidth = 200;
  var objHeight = 100;
  var objColour = "#4285f4";
  var objectType = "rect"; // to change soon

    function setCurrObject(type, value){
      switch(type){
      case "width":
      objWidth = value;
      break;
      case "height":
      objHeight = value;
      break;
      case "colour":
      objColour = value;
      break;
    }
    drawPrev();
  }
  // draw the preview frame
  function drawPrev(){
    prevCanvas.clearCanvas();
    switch(objectType){
      case "rect":
      prevCanvas.drawRect({
        fillStyle: objColour,
        x: prevCanvas.width()/2, y: prevCanvas.height()/2,
        width: objWidth,
        height: objHeight
      });
      break;
    }
  }
  canvas.mousedown(function(e) {
    // event.preventDefault();
    /* Act on the event */
    //somehow the offset uses the dimentions
    // relative to the canvas
    // when client bug is fixed
    // change to e.client.y
    // change to e.client.x
    console.log(e.offsetY)
    console.log(e.offsetX)
    var y = e.offsetY;
    var x = e.offsetX;
    $('#myCanvas').drawRect({
      fillStyle: objColour,
      x: x, y: y,
      width: objWidth,
      height: objHeight
    });
    currentAction =
    { type: "rect",
    x:x,
    y:y,
    width:objWidth,
    height:objWidth,
    fillStyle:objColour
  }
  console.log("down")
});
//   $('#myCanvas').mousedown(function(e) {
//     console.log("hold")
//     timeoutId = setTimeout(myFunction, 1000);
// }).bind('mouseup mouseleave', function(e) {
//     clearTimeout(timeoutId);
//     console.log("drag")
// });


  io.socket.on('connect', function() {
    io.socket.emit('msg', "Hello just joined");
    console.log("connected")


    // i know that im supposed to keep any progressive on
    // functionf after this in this anonymous function
    // but i has issues with drawrecieve ataching on draw function
  });
  io.socket.on('user', function(data){
    switch(data.type){
      case "info":
      console.log("msg " + data.msg)
      $.snackbar({content: data.msg, style: "toast", timeout: 4000});
      break;
      default:
      console.log("server sent msg")
      console.log(data)
      break;
    }
  });
  io.socket.on('draw', drawRecieve);


  canvas.on("mouseup", function(event) {
    // event.preventDefault();
    /* Act on the event */
    console.log("up & send")
    io.socket.emit('draw', currentAction);
    currentAction = null;
  });
  function drawRecieve(data) {
    console.log(data)
    console.log(data.user)
    if(data.type == "rect"){
      $('#myCanvas').drawRect({
        fillStyle: data.fillStyle,
        x: data.x, y: data.y,
        width: data.width,
        height: data.height
      });
    }
  }
  $("#colourSel").on('click', 'a', function(event) {
    event.preventDefault();
    var hex = $( this ).data('selcolour');
    setCurrObject("colour", "#" + hex);
    console.log("user selected colour : " + hex);

  });
  $('#objHeight').on({
    slide: function(){
      setCurrObject("height", $(this).val());
    }
  });
  $('#objWidth').on({
    slide: function(){
      setCurrObject("width", $(this).val());
    }
  });

// // Create a drawHeart() method
// $.jCanvas.extend({
//   name: 'drawHeart',
//   type: 'heart',
//   props: {},
//   fn: function(ctx, params) {
//     // Just to keep our lines short
//     var p = params;
//     // Draw heart
//     ctx.beginPath();
//     ctx.moveTo(p.x, p.y + p.radius);
//     // Left side of heart
//     ctx.quadraticCurveTo(
//       p.x - (p.radius * 2),
//       p.y - (p.radius * 2),
//       p.x,
//       p.y - (p.radius / 1.5)
//     );
//     // Right side of heart
//     ctx.quadraticCurveTo(
//       p.x + (p.radius * 2),
//       p.y - (p.radius * 2),
//       p.x,
//       p.y + p.radius
//     );
//     // Call the detectEvents() function to enable jCanvas events
//     // Be sure to pass it these arguments, too!
//     $.jCanvas.detectEvents(this, ctx, p);
//     // Call the closePath() functions to fill, stroke, and close the path
//     // This function also enables masking support and events
//     // It accepts the same arguments as detectEvents()
//     $.jCanvas.closePath(this, ctx, p);
//   }
// });

// // Use the drawHeart() method
// $('canvas').drawHeart({
//   layer: true,
//   draggable: true,
//   fillStyle: '#c33',
//   radius: 50,
//   x: 150, y: 130
// });

});
