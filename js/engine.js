var GameEngine = (function() {
    var gameEngine = {};
    var timer; // Timer for update and draw events
    var counter = 0; // Counter for update
    var gameSpeed = 10; // How many update ticks until a block moves down
    
    var heldBlock, nextBlock, curBlock; // Block objects
    
    var updateHeld = false,
        updateNext = false,
        updateCur = false;
        updateField = false; // Update flags for drawing
    
    gameEngine.play = false; // Flag for when game is currently being played
    
    gameEngine.init = function() {
        Controller.init();
    }
    
    gameEngine.startGame = function() {
        gameEngine.play = true;
        timer = setInterval(function() {
            update();
            draw();
        }, 50); // 20 fps
        
        View.newField();
        
        curBlock = new Block(4, 20, chooseBlock());
        nextBlock = new Block(0, 0, chooseBlock());
        
        updateNext = true;
    }
    
    gameEngine.endGame = function() {
        gameEngine.play = false;
        clearInterval(timer);
        
        heldBlock = undefined;
        nextBlock = undefined;
        curBlock = undefined;
        $('.block').remove();
    }
    
    var chooseBlock = function() {
        return ~~(Math.random() * 7);
    }
    
    var canMove = function(dx, dy) {
        var moveable = true;
        for (var i = 0; i < 4; i++) {
            if (!isFree(curBlock.x[i] + dx, curBlock.y[i] + dy)) {
                moveable = false;
                break;
            }
        }
        return moveable
    }
    
    var isFree = function(xPos, yPos) {
        if (xPos < 0 || xPos >= 10)
            return false;
        if (yPos < 0)
            return false;
        if (yPos >= 20)
            return true;
        return View.isFree(xPos, yPos);
    }
    
    var tryMove = function(xPos, yPos) {
        if (canMove(xPos, yPos)) {
            curBlock.move(xPos, yPos);
            updateCur = true;
            return true;
        }
        return false;
    }
    
    var stackBlock = function() {
        View.addBlock(curBlock);
        curBlock = new Block(4, 20, nextBlock.type);
        nextBlock = new Block(0, 0, chooseBlock());
        updateField = true;
        updateCur = true;
        updateNext = true;
    }
    
    var update = function() {
        if (Controller.move !== 0) {
            tryMove(Controller.move, 0);
            Controller.move = 0;
        }
        if (Controller.down) {
            tryMove(0, -1);
            Controller.down = false;
        }
    
        counter++;
        if (counter === gameSpeed) {
            counter = 0;
            if (!tryMove(0,-1)) {
                stackBlock();
            }
        }
    }
    
    var draw = function() {
        if (updateNext) {
            $('#next .block').remove();
            View.drawSide('#next', nextBlock);
            updateNext = false;
        }
        
        if (updateHeld) {
            $('#held .block').remove();
            View.drawSide('#held', heldBlock);
            updateHeld = false;
        }
        
        if (updateCur) {
            $('.cur').remove();
            View.drawCur(curBlock);
            updateCur = false;
        }
        
        if (updateField) {
            $('.field').remove();
            View.drawField();
            updateField = false;
        }
    }
    
    return gameEngine;
})();
