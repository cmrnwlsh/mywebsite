import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const game = grid =>
    <Container className={'Map'} key={'69420'}>
        {grid.map((row, i) =>
            <Row key={i}>{row.map((ent, j) =>
                <Col key={j + 30} className={'Tile'}>
                    {ent.symbol}
                </Col>)}
            </Row>)}
    </Container>;

export const inventory = inv =>
    <Container className={'Map'} key={'69420'}>
        <Row className={'py-2'}>
            {inv.map((item, i) =>
                <Col key={i + 69}>{i + 1 + ':   ' + item.toString()}</Col>)}
        </Row>
    </Container>

export const message = message => {
    const key = message.split().reduce((x, y) => x + y);
    return (
        <Row key={key}>
            <Col key={key + 1}/><Col key={key + 2} xs={8}><code key={key + 3}>
            {message}
        </code></Col><Col/>
        </Row>
    )
}

export const controls =
    ['Movement: Arrow Keys', 'Pickup: Space', 'Inventory: i'].map(line => message(line));

export const invControls =
    ['Drop Item: d', 'Exit: i'].map(line => message(line));

export const base = state => [game(state), controls];
export const inv = player => [inventory(player.inventory), invControls];