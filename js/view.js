var View = (function() {
    var view = {}
    var field;
    
    view.newField = function() {
        field = [];
        for (var i = 0; i < 10; i++) {
            field.push([]);
            for (var j = 0; j < 20; j++) {
                field[i].push(-1);
            }
        }
    }
    
    view.addBlock = function(block) {
        for (var i = 0; i < 4; i++) {
            field[block.x[i]][block.y[i]] = block.type;
        }
    }
    
    view.pushDown = function(rows) {
        var row = rows[0] + 1,
            num = 1,
            len = rows.length;
            
        while (row < 20) {
            if (num < len) {
                if (row === rows[num]) {
                    num++;
                    row++;
                    continue;
                }
            }
            view.shiftRow(row, num);
            row++;
        }
    }
    
    view.shiftRow = function(row, num) {
        for (var i = 0; i < 10; i++) {
            field[i][row-num] = field[i][row];
            field[i][row] = -1;
        }
    }
    
    view.isFree = function(xPos, yPos) {
        return field[xPos][yPos] === -1;
    }
    
    view.checkRow = function(row) {
        full = true;
        for (var i = 0; i < 10; i++) {
            if (view.isFree(i, row)) {
                full = false;
                break;
            }
        }
        return full;
    }
    
    view.drawField = function() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 20; j++) {
                if (field[i][j] !== -1)
                    drawPart('#gamefield', i * 30, 570 - j * 30, 'field');
            }
        }
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
            y = yPos - block.y[i] * 30;

        drawPart(id, x, y, tag);
    }
    
    var drawPart = function(id, x, y, tag) {
        var $element = $('<div/>').addClass('block');
        
        if (tag)
            $element.addClass(tag);
        $element.css('left', x+'px').css('top', y+'px');
        $(id).append($element);
    }
    
    return view;
})();
