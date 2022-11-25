import MainNav from "../../pages/MainNav";
import Container from "react-bootstrap/Container";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import './SwordGame.css'
import {useState} from "react";
import {Floor, Player} from "./EntityTemplates";

export default function SwordGame() {
    const range = Array.from(Array(24));
    const [[px, py], setPlayerPos] = useState([12, 12]);
    const [ents, setEnts] = useState(range.map((row, i) => range.map((col, j) =>
        i === py && j === px ? new Player(i, j) : new Floor(i, j))));

    console.log(px + " " + py);

    function move(ent, coords) {
        ents[ent.y][ent.x] = new Floor(ent.x, ent.y);
        ent.x = coords[0];
        ent.y = coords[1];
        ents[ent.y][ent.x] = ent;

        if (ent instanceof Player)
            setPlayerPos(coords);

        setEnts(ents);
    }

    function keyHandler(event) {
        console.log(event.key);
        if (event.key === 'ArrowUp')
            move(ents[py][px], [px, (py - 1) >= 0 ? (py - 1) : range.length - 1]);

        if (event.key === 'ArrowDown')
            move(ents[py][px], [px, Math.abs(py + 1) % range.length]);

        if (event.key === 'ArrowLeft')
            move(ents[py][px], [(px - 1) >= 0 ? (px - 1) : range.length - 1, py]);

        if (event.key === 'ArrowRight')
            move(ents[py][px], [Math.abs(px + 1) % range.length, py]);
    }

    return (
        <>
            <MainNav/>
            <Container className={'GameTabs'}>
                <Tabs fill>
                    <Tab eventKey={'game'} title={'Game'}>
                        <Container className={"SwordGame"} onKeyDown={keyHandler} tabIndex={0}>
                            {ents.map(row => <Row>{row.map(ent =>
                                <Col className={"Tile"}>{ent.symbol}</Col>)}</Row>)}
                        </Container>
                    </Tab>
                    <Tab eventKey={'inventory'} title={'Inventory'}>
                        <Container className={'Inventory'}></Container>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}

