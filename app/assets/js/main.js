(function() {
  function morellet(context, squareLength, width, height) {
    var start = null;
    function draw(timestamp) {
      if(!start) {
        context.fillStyle = '#333';
        context.clearRect(0, 0, width, height);
        isDrawing = true;
        var squareSize = 5;
        // fill grid of 10px squares with randomly chosen color
        for(var j = 0; j < squareLength; j+=squareSize) {
          for(var i = 0; i < squareLength; i+=squareSize) {
            if(Math.random() < .64) {
              context.fillStyle = '#EE1111';
            } else {
              context.fillStyle = '#c1fae1';
            }
            context.fillRect(i, j, squareSize, squareSize);          
          }  
        }
        start = timestamp;
      }        
    }
    return draw;
  }
  function generateColor(r, g, b) {
    var colorText = 'rgb(' + r + ',' + g + ',' + b + ')';
    return colorText;    
  }
  function cantor(context, squareLength, width, height) {
   var start = null;
   var toDraw = [];
   var drawSegment = true;

   function drawCircle(originX, originY, maxRadius, generation) {
     var segment_size = Math.max((Math.PI * 2) * Math.pow(3, -generation), 0.5);
     var radius = Math.max(maxRadius * Math.pow(3, -generation), 1);
     var radialColor = generateColor( 255 -  20* (generation), 0, 0);

     for(var x = 0; x < Math.PI * 2; x = x + segment_size) {
       if(drawSegment === true) {
        var path = new Path2D();
        path.moveTo(originX, originY); 
        path.lineTo(
          originX + radius*Math.cos(segment_size), 
          originY + radius*Math.sin(segment_size));      
        path.arc(originX, originY, radius, x, x + segment_size, true);
        path.lineTo(originX, originY);
        context.fillStyle = radialColor;
        context.fill(path);
      }
      drawSegment = !drawSegment; 
    }
    if(radius > 1) {
      drawCircle(originX, originY, radius, generation + 1);
    }
  }

  function drawSlice(start, end, y, barsize, generation) {
   var segment_size = Math.max(width * Math.pow(3, -generation), .1);
   var drawSegment = true;
   var barColor = generateColor(255 - (generation * 30), 0, 0);
   for(var x = start; x < end; x = x + segment_size) {
     if(drawSegment === true) {
       context.fillStyle = barColor;
       context.fillRect(x, y, segment_size, barsize);
     }
     if(drawSegment === true && y < height) {
      drawSlice(x, x + segment_size, y + barsize, barsize, generation + 1);
    }
    drawSegment = !drawSegment; 
  }
}



function draw(timestamp) { 
  if (!start) {
    context.fillStyle = '#FFAA64';
    context.fillRect(0, 0, width, height);
    start = timestamp;
    var progress = timestamp - start;
      // drawSlice(0, width, height / 2.0, height / 10.0, 0);
      drawCircle(width / 2.0, height/2.0, 500, 0);
    } 
  }


  return draw;
}

function shadows(context, squareLength, width, height) {
  var start = null;
  var driftRate = 5 / 1000; 
  function draw(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    var drift = 3 * Math.sin(progress * ((2 * Math.PI) / 5000));
    var cosDrift = 3 * Math.cos(progress * ((2 * Math.PI) / 5000));

    context.clearRect(0, 0, width, height);

    context.fillStyle = '#222222';
    var squareSize = 10;
    for(var j = 0; j < squareLength ; j+=squareSize) {
      for(var i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j + drift, j, squareSize, squareSize);
          }
        }

        context.fillStyle = '#292929';
        for(var j = 0; j < squareLength ; j+=squareSize) {
          for(var i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j, j - drift, squareSize, squareSize);
          }
        }

        context.fillStyle = '#2f2f2f';
        for(var j = 0; j < squareLength ; j+=squareSize) {
          for(var i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j - cosDrift, j - drift, squareSize, squareSize);
          }
        }

        context.fillStyle = '#f3f3f3';
        for(var j = 0; j < squareLength ; j+=squareSize) {
          for(var i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j - cosDrift, j + cosDrift, squareSize, squareSize);
          }
        }
      }

      return draw;
    }

    function stopDrawing() {
      isDrawing = false;
    }

    function drawGrid(animationFunc) {
      var canvas = $('#rothko')[0];
      var context = canvas.getContext('2d');

      var parent = $('#rothko').parent();
      var squareWidth = parent.width();


      canvas.width =  squareWidth;
      canvas.height = squareWidth;  

      var squareLength = canvas.width;

      return animationFunc(context, squareLength, canvas.width, canvas.height);
    }

    function animationLoop(timestamp) {
      functionToDraw(timestamp);
      window.requestAnimationFrame(animationLoop);
    };

  // Global state variables
  var functionToDraw;
  var functionToBind;

  $(document).ready(function() {

    $("#morellet-link").click(function(e) {
      functionToBind = morellet;
      functionToDraw = drawGrid(morellet);
      $("#description")
      .html("The picture above is inspired by a piece of art I saw in the MoMA. View the original <em>Random Distribution of 40,000 Squares Using the Odd and Even Numbers of a Telephone Directory</em> by Francois Morellet over at the <a href=\"https://www.moma.org/m/arts/105479?locale=en\">MoMA Website.</a>");
      $("#canvas-title").text("Morellet");
      e.preventDefault();
    });

    $("#floater-link").click(function(e) {
      functionToBind = shadows;
      functionToDraw = drawGrid(shadows);
      $("#description").html("Sway.");
      $("#canvas-title").text("Floater");
      e.preventDefault();
    });

    // $("#cantor-link").click(function(e) {
    //   functionToBind = cantor;
    //   functionToDraw = drawGrid(cantor);
    //   $("#description").html("");
    //   $("#canvas-title").text("Cantor");
    //   e.preventDefault();
    // });

    functionToBind = shadows;
    functionToDraw = drawGrid(functionToBind);

    animationLoop(0);
    $(window).resize(function(){
      functionToDraw = drawGrid(functionToBind);
    });
  });

})();
