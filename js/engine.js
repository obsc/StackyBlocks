var GameEngine = (function() {
    var gameEngine = {};
    var timer; // Timer for update and draw events
    var counter = 0; // Counter for update
    var gameSpeed = 10; // How many update ticks until a block moves down
    
    var heldBlock, nextBlock, curBlock; // Block objects
    
    var holdable = false;
    
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

        holdable = true;
        
        updateNext = true;
        $('.block').remove();
    }
    
    gameEngine.endGame = function() {
        gameEngine.gameOver();
        $('.block').remove();
    }
    
    gameEngine.gameOver = function() {
        gameEngine.play = false;
        clearInterval(timer);

        heldBlock = undefined;
        nextBlock = undefined;
        curBlock = undefined;
    }
    
    var chooseBlock = function() {
        return ~~(Math.random() * 7);
    }
    
    var tryMove = function(xPos, yPos) {
        if (canMove(xPos, yPos)) {
            curBlock.move(xPos, yPos);
            updateCur = true;
            return true;
        }
        return false;
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
    
    var tryRotate = function() {
        if (canRotate()) {
            curBlock.rotate();
            updateCur = true;
            return true;
        }
        return false;
    }
    
    var canRotate = function() {
        var rotatable = true;
        for (var i = 0; i < 4; i++) {
            if (!isFree(curBlock.checkRot(i), curBlock.checkRot(4 + i))) {
                rotatable = false;
                break;
            }
        }
        return rotatable;
    }
    
    var holdBlock = function() {
        var tempType = curBlock.type;
        if (heldBlock)
            curBlock = new Block(4, 20, heldBlock.type);
        else {
            curBlock = new Block(4, 20, nextBlock.type);
            nextBlock = new Block(0, 0, chooseBlock());
            updateNext = true;
        }
        
        heldBlock = new Block(0, 0, tempType);
        updateCur = true;
        updateHeld = true;
        holdable = false;
    }
    
    var stackBlock = function() {
        View.addBlock(curBlock);
        curBlock = new Block(4, 20, nextBlock.type);
        nextBlock = new Block(0, 0, chooseBlock());
        updateField = true;
        updateCur = true;
        updateNext = true;
        holdable = true;
    }
    
    var endRound = function() {
        var bot, num;
        var clearRows = [];
        checkEnd();
        bot = curBlock.bot();
        num = curBlock.checkNum();
        stackBlock();
        
        while (num > 0) {
            if (bot < 20 && View.checkRow(bot))
                clearRows.push(bot);
            bot++;
            num--;
        }
        
        View.pushDown(clearRows);
    }
    
    var dropDown = function() {
        while (tryMove(0, -1)) {
        }
        endRound();
    }
    
    var checkEnd = function() {
        for (var i = 0; i < 4; i++) {
            if (curBlock.y[i] >= 20) {
                gameEngine.gameOver();
                break;
            }
        }
    }
    
    var gameTick = function() {        
        if (!tryMove(0,-1)) {
            endRound();
        }
    }
    
    var update = function() {
        if (Controller.hold && holdable)
            holdBlock();
        if (Controller.move !== 0)
            tryMove(Controller.move, 0);
        if (Controller.down)
            tryMove(0, -1);
        if (Controller.rotate)
            tryRotate();
        if (Controller.drop)
            dropDown();
                            
        counter++;
        if (counter === gameSpeed) {
            counter = 0;
            gameTick();
        }
        
        Controller.clear();
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
