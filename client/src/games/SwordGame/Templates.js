export class Character {
    constructor(label=this.constructor.name, symbol='') {
        this.label = label;
        this.health = 100;
        this.inventory = []
        this.equipment = {};
        this.symbol = symbol;
    }

    toString() {
        return this.label;
    }
}

export class Player extends Character{
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.equipment = {LHand: {}, RHand: {}};
        this.symbol = '@';
    }

    move(state, coords) {
        state[coords[1]][coords[0]].contents.push(
            state[this.y][this.x].popItem(this));
        this.y = coords[1];
        this.x = coords[0];
    }

    pickup(state, index) {
        if(state[this.y][this.x].contents.length > 1)
            this.inventory.push(state[this.y][this.x].popItem(index));
    }

    drop(state, index) {
        if(this.inventory.length > index)
            state[this.y][this.x].contents.unshift(this.popItem(index));
    }

    equip() {

    }

    popItem(item) {
        const ret = this.inventory;
        if(typeof item == 'number') {
            this.inventory = this.inventory.filter((x, i) => i !== item);
            return ret[item];
        }
        else {
            this.inventory = this.inventory.filter((x) => x !== item);
            return ret.find(element => element === item);
        }
    }
}

export class Floor {
    constructor(x, y, contents = []) {
        this.x = x;
        this.y = y;
        this.contents = contents;
    }

    get symbol() {
        return this.contents.length ? this.contents.slice(-1)[0].symbol : '.';
    }

    get player() {
        return this.contents.filter(x => x instanceof Player)[0];
    }

    popItem(item) {
        const ret = this.contents;
        if(typeof item == 'number') {
            this.contents = this.contents.filter((x, i) => i !== item);
            return ret[item];
        }
        else {
            this.contents = this.contents.filter((x) => x !== item);
            return ret.find(element => element === item);
        }
    };
}

class Weapon {
    constructor() {
        this.damage = {bronze: 1, iron: 2, steel: 3};
        this.symbol = '/';
    }
}

export class Sword extends Weapon {
    constructor(material) {
        super();
        this.type = 'sword';
        this.material = material;
        this.damage = this.damage[material] * 2;
    }

    toString() {
        return ('Sword | ' + 'Damage: ' + this.damage + ', ' + 'Material: ' + this.material)
    }
}