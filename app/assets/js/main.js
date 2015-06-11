(function() {
  function morellet(context, squareLength) {
    context.fillStyle = '#333';
    var squareSize = 5;
    // fill grid of 10px squares with randomly chosen color
    for(j = 0; j < squareLength; j+=squareSize) {
      for(i = 0; i < squareLength; i+=squareSize) {
        if(Math.random() < .64) {
          context.fillStyle = '#de355f';
        } else {
          context.fillStyle = '#c1fae1';
        }
        context.fillRect(i, j, squareSize, squareSize);          
      }  
    }
  }
  
  function shadows(context, squareLength, width, height) {
    var start = null;
    var driftRate = 5 / 1000; 
    function drawShadows(timestamp) {
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
        window.requestAnimationFrame(drawShadows);
      }

      window.requestAnimationFrame(drawShadows);
  }


  function drawGrid() {
    var canvas = $('#rothko')[0];
    var context = canvas.getContext('2d');

    var parent = $('#rothko').parent();
    var squareWidth = parent.width();
    

    canvas.width =  squareWidth;
    canvas.height = squareWidth;  

    var squareLength = canvas.width;
    // morellet(context, squareLength);
    shadows(context, squareLength, canvas.width, canvas.height);
  }

  $(document).ready(function() {
    drawGrid();
    $(window).resize(drawGrid);
  });

})();
