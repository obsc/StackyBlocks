function Block(x, y, type) {
    var rotate = 0;
    
    this.type = type;
    
    this.x = [0, 0, 0, 0];
    this.y = [0, 0, 0, 0];
    for (var i = 0; i < 4; i++) {
        this.x[i] = x + OFFSET[rotate][type][i];
        this.y[i] = y + OFFSET[rotate][type][4 + i];
    }
    
    this.newPos = function(xPos, yPos) {
        for (var i = 0; i < 4; i++) {
            this.x[i] = xPos + OFFSET[rotate][type][i];
            this.y[i] = yPos + OFFSET[rotate][type][4 + i];
        }
    }
    
    this.checkRot = function(i) {
        var nextRot = rotate + 1;
        if (nextRot === 4)
            nextRot = 0;
        
        if (i < 4)
            return this.x[0] + OFFSET[nextRot][type][i];
        else
            return this.y[0] + OFFSET[nextRot][type][i];
    }
    
    this.rotate = function() {
        rotate += 1;
        if (rotate === 4)
            rotate = 0;
        this.newPos(this.x[0], this.y[0]);
    }
    
    this.move = function(dx, dy) {
        for (var j = 0; j < 4; j++) {
            this.x[j] += dx;
            this.y[j] += dy;
        }
    }
    
    this.checkNum = function() {
        if (rotate % 2 === 1)
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

var OFFSET = [
    [
        [0, -1, 1, 2, 0, 0, 0, 0],
        [0, -1, -1, 1, 0, 0, 1, 0],
        [0, -1, 1, 1, 0, 0, 0, 1],
        [0, 0, -1, -1, 0, 1, 0, 1],
        [0, -1, 0, 1, 0, 0, 1, 1],
        [0, -1, 0, 1, 0, 0, 1, 0],
        [0, 0, -1, 1, 0, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0, 0, -1, 1, 2],
        [0, 0, 1, 0, 0, 1, 1, -1],
        [0, 0, 0, 1, 0, 1, -1, -1],
        [0, 0, -1, -1, 0, 1, 0, 1],
        [0, 0, 1, 1, 0, 1, 0, -1],
        [0, 0, 1, 0, 0, 1, 0, -1],
        [0, 1, 1, 0, 0, 0, 1, -1]
    ],
    [
        [0, -1, 1, 2, 0, 0, 0, 0],
        [0, 1, 1, -1, 0, 0, -1, 0],
        [0, 1, -1, -1, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 1, 0, 1],
        [0, -1, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, -1, 0, 0, -1, 0],
        [0, 0, -1, 1, 0, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0, 0, -1, 1, 2],
        [0, 0, -1, 0, 0, -1, -1, 1],
        [0, 0, 0, -1, 0, -1, 1, 1],
        [0, 0, -1, -1, 0, 1, 0, 1],
        [0, 0, 1, 1, 0, 1, 0, -1],
        [0, 0, -1, 0, 0, -1, 0, 1],
        [0, 1, 1, 0, 0, 0, 1, -1]
    ]
];
