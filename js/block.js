function Block(x, y, type) {
    var OFFSET = [
        [0, -1, 1, 2, 0, 0, 0, 0],
        [0, -1, -1, 1, 0, 0, 1, 0],
        [0, -1, 1, 1, 0, 0, 0, 1],
        [0, 0, -1, -1, 0, 1, 0, 1],
        [0, -1, 0, 1, 0, 0, 1, 1],
        [0, -1, 0, 1, 0, 0, 1, 0],
        [0, 0, -1, 1, 0, 1, 1, 0]
    ];
    var tilted = false;
    
    this.type = type;
    
    this.x = [];
    this.y = [];
    for (var i = 0; i < 4; i++) {
        this.x.push(x + OFFSET[type][i]);
        this.y.push(y + OFFSET[type][4 + i]);
    }
    
    this.rotate = function() {
        tilted = !tilted;
    }
    
    this.move = function(dx, dy) {
        for (var j = 0; j < 4; j++) {
            this.x[j] += dx;
            this.y[j] += dy;
        }
    }
    
    this.checkNum = function() {
        if (tilted)
            return this.width();
        else
            return this.height();
    }
    
    this.bot = function() {
        return Math.min.apply(Math, this.y);
    }
    
    this.width = function() {
        if (this.type === 0)
            return 4;
        else if (this.type === 3)
            return 2;
        else
            return 3;
    }
    
    this.height = function() {
        if (this.type === 0)
            return 1;
        else
            return 2;
    }
    
}
