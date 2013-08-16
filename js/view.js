var View = (function() {
    var view = {}
        
    view.field = [];
    
    view.isFree = function(xPos, yPos) {
        return true;
    }
    
    view.drawField = function() {
    
    }
    
    view.drawCur = function(block) {
        if (block) {
            for (var i = 0; i < 4; i++) {
                if (block.y[i] < 20)
                    drawBlock('#gamefield', block, 0, 570, i, 'cur');
            }
        }
    }
    
    view.drawSide = function(id, block) {
        if (block) {
            var xPos = 105 - block.width() * 15;
            var yPos = 15 + block.height() * 15;
            for (var i = 0; i < 4; i++) {
                drawBlock(id, block, xPos, yPos, i);
            }
        }
    }
    
    var drawBlock = function(id, block, xPos, yPos, i, tag) {
        var x = xPos + block.x[i] * 30,
            y = yPos - block.y[i] * 30,
            $element = $('<div/>').addClass('block');
        
        if (tag)
            $element.addClass(tag);
        $element.css('left', x+'px').css('top', y+'px');
        $(id).append($element);
    }
    
    return view;
})();
