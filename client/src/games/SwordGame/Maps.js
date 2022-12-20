const {Floor, Sword, Character} = require("./Templates");

const range = Array.from(Array(24));
export const baseMap = player => {
    const placements = {
        [`${player.x},${player.y}`]: [player],
        '12,10': [new Sword('iron')],
        '12,8': [new Character('Training Dummy', 'T')]
    }
    return range.map((row, y) => range.map((col, x) =>
        new Floor(x, y, placements[`${x},${y}`])))
}

