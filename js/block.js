function Block(x, y, type) {
    var OFFSET = [
        [0, -1, 1, 2, 0, 0, 0, 0],
        [0, -1, -1, 1, 0, 0, 1, 0],
        [0, -1, 1, 1, 0, 0, 0, 1],
        [0, 0, 1, 1, 0, 1, 0, 1],
        [0, -1, 0, 1, 0, 0, 1, 1],
        [0, -1, 0, 1, 0, 0, 1, 0],
        [0, 0, -1, 1, 0, 1, 1, 0]
    ];
    
    this.type = type;
    
    this.x = [];
    this.y = [];
    for (var i = 0; i < 4; i++) {
        this.x.push(x + OFFSET[type][i]);
        this.y.push(y + OFFSET[type][4 + i]);
    }
    
}