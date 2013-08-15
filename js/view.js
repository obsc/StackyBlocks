var View = (function() {
    var view = {}
    
    var drawBlock = function(id, block, x, y) {
        var $element, xPos, yPos, i;
        for (i = 0; i < 4; i++) {
            xPos = x + block.x[i] * 30;
            yPos = y - block.y[i] * 30;
            $element = $('<div/>').addClass('block');
            $element.css('left', xPos+'px').css('top', yPos+'px');
            $(id).append($element);
        }
    }
    
    view.drawSide = function(id, block) {
        var xPos = 105 - block.width() * 15;
        var yPos = 15 + block.height() * 15;
        drawBlock(id, block, xPos, yPos);
    }
    
    return view;
})();
