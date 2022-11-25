import MainNav from "../../pages/MainNav";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import './SwordGame.css'
import {useState} from "react";

export default function SwordGame() {
    const range = Array.from(Array(24));
    const [[px, py], setPlayerPos] = useState([12, 12]);
    const [ents, setEnts] = useState(range.map((row, i) => range.map((col, j) =>
        i === py && j === px ? {type: 'player', x: j, y: i, symbol: '@'} :
                               {type: 'floor', x: j, y: i, symbol: '.'})));

    console.log(px + " " + py);

    function move(ent, coords) {
        if(ent.type === 'player')
            setPlayerPos(coords);

        ents[ent.y][ent.x] = {type: 'floor', x: ent.x, y: ent.y, symbol: '.'}
        ent.x = coords[0];
        ent.y = coords[1];
        ents[ent.y][ent.x] = ent;
        setEnts(ents);
    }

    function keyHandler(event) {
        console.log(event.key);
        if(event.key === 'ArrowUp')
            move(ents[py][px],[px, (py - 1) >= 0 ? (py - 1) : range.length - 1]);

        if(event.key === 'ArrowDown')
            move(ents[py][px],[px, Math.abs(py + 1) % range.length]);

        if(event.key === 'ArrowLeft')
            move(ents[py][px],[(px - 1) >= 0 ? (px - 1) : range.length - 1, py]);

        if(event.key === 'ArrowRight')
            move(ents[py][px],[Math.abs(px + 1) % range.length, py]);
    }

    return (
        <>
            <MainNav/>
            <Container className={"SwordGame"} onKeyDown={keyHandler} tabIndex={0}>
                {ents.map((row => <Row>{row.map(ent => <Col className={"Tile"}>{ent.symbol}</Col>)}</Row>))}
            </Container>
        </>
    )
}

