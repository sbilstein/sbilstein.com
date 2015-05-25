(function() {
  function drawGrid() {
    var canvas = $('#rothko')[0];
    var context = canvas.getContext('2d');

    var parent = $('#rothko').parent();
    canvas.width =  parent.width();
    canvas.height = parent.width();  

    var height = canvas.height;
    var width = canvas.width;
    context.fillStyle = '#333';
    var squareSize = 5;
    // fill grid of 10px squares with randomly chosen color
    for(j = 0; j < height; j+=squareSize) {
      for(i = 0; i < width; i+=squareSize) {
        if(Math.random() < .64) {
          context.fillStyle = '#de355f';
        } else {
          context.fillStyle = '#c1fae1';
        }
        context.fillRect(i, j, squareSize, squareSize);          
      }  
    }
  }
  $(document).ready(function() {
    drawGrid();
  });

})();
