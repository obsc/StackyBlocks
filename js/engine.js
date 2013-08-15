var GameEngine = (function() {
    var gameEngine = {};
    var timer;
    
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
    }
    
    gameEngine.endGame = function() {
        clearInterval(timer);
        $('div').css('display', 'none');
    }
    
    var update = function() {
        
    }
    
    var draw = function() {
        
    }
    
    return gameEngine;
})();
