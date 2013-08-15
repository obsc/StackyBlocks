var Controller = (function() {
    var controller = {
        hold: false,
        rotate: false,
        down: false,
        move: 0 //-1 = left, 1 = right
    },
        ESC = 27,
        SPACE = 32,
        LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    
    controller.init = function() {
        $('body').keydown(keyHandler);
    }
    
    var keyHandler = function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        
        if (!GameEngine.play && code === SPACE)
            GameEngine.startGame();
        else {
            switch(code) {
                case SPACE:
                    controller.hold = true;
                    break;
                case ESC:
                    GameEngine.endGame();
                    break;
                case LEFT:
                    controller.move = -1;
                    break;
                case RIGHT:
                    controller.move = 1;
                    break;
                case UP:
                    controller.rotate = true;
                    break;
                case DOWN:
                    controller.down = true;
                    break;
            }
        }
        
    }
    
    return controller;
})();
