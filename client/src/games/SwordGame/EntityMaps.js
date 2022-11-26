import {Sword} from "./EntityTemplates";

const {Player, Floor} = require("./EntityTemplates");

const range = Array.from(Array(24));

export const maps = {
    baseMap: (px, py) => range.map((row, y) => range.map((col, x) =>
        new Floor(x, y, x === px && y === py ? [new Player(x, y)] :
            x === 12 && y === 10 ? [new Sword('iron')] : []
        )))
}