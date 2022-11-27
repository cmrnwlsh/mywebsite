const {Floor, Sword} = require("./Templates");

const range = Array.from(Array(24));

export const baseMap = player => range.map(
    (row, y) => range.map((col, x) =>
        new Floor(x, y,
            x === player.x && y === player.y ? [player] :
                x === 12 && y === 10 ? [new Sword('iron')] : []
    )))

