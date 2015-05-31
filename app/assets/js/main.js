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

  function drawGrid() {
    var canvas = $('#rothko')[0];
    var context = canvas.getContext('2d');

    var parent = $('#rothko').parent();
    var squareWidth = parent.width();
    

    canvas.width =  squareWidth;
    canvas.height = squareWidth;  

    var squareLength = canvas.width;
    morellet(context, squareLength);
  
  }

  $(document).ready(function() {
    drawGrid();
    $(window).resize(drawGrid);
  });

})();
