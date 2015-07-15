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
        for(j = 0; j < squareLength; j+=squareSize) {
          for(i = 0; i < squareLength; i+=squareSize) {
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

  function cantor(context, squareLength, width, height) {
    var start = null;
    function draw(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      // granularity happens in rounds
      granularity = Math.floor(timestamp / 200) + 1;
      context.fillStyle = '#222222';
      var step = width / Math.pow(3, granularity);
      for(j = 0; j < width; j += step) {
       context.fillRect(j, 50, 1, 1)
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
        for(j = 0; j < squareLength ; j+=squareSize) {
          for(i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j + drift, j, squareSize, squareSize);
          }
        }

        context.fillStyle = '#292929';
        for(j = 0; j < squareLength ; j+=squareSize) {
          for(i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j, j - drift, squareSize, squareSize);
          }
        }

        context.fillStyle = '#2f2f2f';
        for(j = 0; j < squareLength ; j+=squareSize) {
          for(i = 0; i < squareLength * 2; i+= 2 * squareSize) {
            // draw black squares at an offset
            var row  = j / squareSize;
            context.fillRect(i - j - cosDrift, j - drift, squareSize, squareSize);
          }
        }

        context.fillStyle = '#f3f3f3';
        for(j = 0; j < squareLength ; j+=squareSize) {
          for(i = 0; i < squareLength * 2; i+= 2 * squareSize) {
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
      e.preventDefault();
    });

    $("#floater-link").click(function(e) {
      functionToBind = shadows;
      functionToDraw = drawGrid(shadows);
      $("#description").html("");
      e.preventDefault();
    });

    functionToBind = shadows;
    functionToDraw = drawGrid(functionToBind);

    animationLoop(0);
    $(window).resize(function(){
      functionToDraw = drawGrid(functionToBind);
    });
  });

})();
