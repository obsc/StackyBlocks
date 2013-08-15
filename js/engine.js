var GameEngine = (function() {
    var gameEngine = {};
    var timer;
    var heldBlock;
    var nextBlock;
    var curBlock;
    
    var updateHeld = false,
        updateNext = false,
        updateCur = false;
        updateField = false;
    
    gameEngine.play = false;
    
    gameEngine.init = function() {
        Controller.init();
    }
    
    gameEngine.startGame = function() {
        gameEngine.play = true;
        timer = setInterval(function() {
            update();
            draw();
        }, 50); // 20 fps
        
        curBlock = new Block(5, 21, chooseBlock());
        nextBlock = new Block(0, 0, chooseBlock());
        
        updateNext = true;
    }
    
    gameEngine.endGame = function() {
        gameEngine.play = false;
        clearInterval(timer);
        
        heldBlock = undefined;
        nextBlock = undefined;
        curBlock = undefined;
        $('div').css('display', 'none');
    }
    
    var chooseBlock = function() {
        return ~~(Math.random() * 7);
    }
    
    var update = function() {
        
    }
    
    var draw = function() {
        if (updateNext) {
            $('#next .block').remove();
            View.drawSide('#next', nextBlock);
            updateNext = false;
        }
    }
    
    return gameEngine;
})();
