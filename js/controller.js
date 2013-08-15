var Controller = (function() {
    var controller = {},
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
                    break;
                case ESC:
                    GameEngine.doStuff();
                    break;
                case LEFT:
                    break;
                case RIGHT:
                    break;
                case UP:
                    break;
                case DOWN:
                    break;
            }
        }
        
    }
    
    return controller;
})();
