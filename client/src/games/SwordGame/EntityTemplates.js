export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.symbol = '@'
    }
}

export class Floor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.symbol = '.'
    }
}