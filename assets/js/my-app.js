// need to fix the loading allow canvas click until
// dom and css are loaded its causing some unwanted
// issues like not been able to clickon the canvas
$(document).ready(function() {
  var canvas = $("canvas");
  var width = canvas.width();
  var height = canvas.height();
  console.log(width + " " + height )
  canvas.drawArc({
    // draggable: true,
    fillStyle: "green",
    x: 100, y: 100,
    radius: 50
  });



io.socket.on('connect', function() {
  io.socket.emit('msg', "Hello just joined");
  io.socket.on('draw', drawRecieve);

  var currentAction;
  canvas.mousedown(function(e) {
    // event.preventDefault();
    /* Act on the event */
    //somehow the offset uses the dimentions
    // relative to the canvas
    console.log(e.offsetY)
    console.log(e.offsetX)
    var y = e.offsetY;
    var x = e.offsetX;
    $('canvas').drawRect({
      fillStyle: '#9F41A0',
      x: x, y: y,
      width: 200,
      height: 100
    });
    currentAction =
    { type: "rect",
    x:x,
    y:y,
    width:200,
    height:100,
    fillStyle:'#9F41A0'
  }
});

  canvas.mouseup(function(event) {
    // event.preventDefault();
    /* Act on the event */
    console.log("send")
    io.socket.emit('draw', currentAction);
  });

  function drawRecieve(data) {
    console.log(data)
    console.log(data.user)
    if(data.type == "rect"){
      $('canvas').drawRect({
        fillStyle: data.fillStyle,
        x: data.x, y: data.y,
        width: 200,
        height: 100
      });
    }
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
