import MainNav from "../../pages/MainNav";
import Container from "react-bootstrap/Container";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import './SwordGame.css'
import {useState} from "react";
import {Floor, Player} from "./EntityTemplates";
import './EntityMaps'
import {maps} from "./EntityMaps";

export default function SwordGame() {
    const [[px, py], setPlayerPos] = useState([12, 12]);
    const [ents, update] = useState(maps.baseMap(px, py));

    function movePlayer(coords) {
        const [x, y] = coords

        if (ents[y][x] instanceof Floor) {
            ents[y][x] = new Floor(x, y, ents[y][x].contents.concat(ents[py][px].contents.slice(-1)[0]));
            ents[py][px] = new Floor(px, py, ents[py][px].contents.slice(0, ents[py][px].contents.length - 1));
            setPlayerPos(coords);
            update(ents);
        }
    }

    function pickupItem(index) {
        let items;
        let contents = [];

        if(ents[py][px].contents.length > 1) {
            items = ents[py][px].contents.slice(0, ents[py][px].contents.length - 1);
            ents[py][px].contents.slice(-1)[0].inventory =
                ents[py][px].contents.slice(-1)[0].inventory.concat(items[index]);

            items.forEach((element, i) => {
                if(i !== index)
                    contents.push(element);
            })

            ents[py][px] = new Floor(px, py, contents.concat(ents[py][px].contents.slice(-1)[0]))
            console.log(ents[py][px].contents);

            update([...ents]);
        }
    }

    function keyHandler(event) {
        console.log(event.key);
        if (event.key === 'ArrowUp')
            movePlayer([px, (py - 1) >= 0 ? (py - 1) : ents.length - 1]);

        if (event.key === 'ArrowDown')
            movePlayer([px, (py + 1) % ents.length]);

        if (event.key === 'ArrowLeft')
            movePlayer([(px - 1) >= 0 ? (px - 1) : ents[py].length - 1, py]);

        if (event.key === 'ArrowRight')
            movePlayer([(px + 1) % ents[py].length, py]);

        if (event.keyCode === 32)
            pickupItem(0);
    }

    return (
        <>
            <MainNav/>
            <Container className={'GameTabs'}>
                <Tabs fill>
                    <Tab eventKey={'game'} title={'Game'}>
                        <Container className={"SwordGame border"} onKeyDown={keyHandler} tabIndex={0}>
                            {ents.map((row, i) =>
                                <Row key={i + ':'}>{row.map((ent, j) =>
                                <Col key={i + ':' + j} className={"Tile"}>{ent.symbol}</Col>)}</Row>)}
                        </Container>
                    </Tab>
                    <Tab eventKey={'inventory'} title={'Inventory'}>
                        <Container className={'Inventory'}>
                            {ents[py][px].contents.slice(-1)[0].inventory.map((row, i) =>
                                <Row key={i * 30}>
                                    {Object.keys(row).map(key => ' | ' + key + ': ' + row[key])}
                                </Row>)}
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}

