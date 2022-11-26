
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.inventory = [];
        this.symbol = '@'
    }
}

export class Floor {
    constructor(x, y, contents = []) {
        this.x = x;
        this.y = y;
        this.contents = contents;
        this.symbol = this.contents.length ? this.contents.slice(-1)[0].symbol : '.';
    }
}
class Weapon {
    constructor() {
        this.damage = {bronze: 1, iron: 2, steel: 3};
    }
}

export class Sword extends Weapon {
    constructor(material) {
        super();
        this.type = 'sword';
        this.material = material;
        this.damage = this.damage[material] + 3;
        this.symbol = '/';
    }
}