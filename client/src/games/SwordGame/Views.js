import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { v4 as uuid } from 'uuid';

export const game = grid =>
    <Container className={'Map'} key={uuid()}>
        {grid.map(row =>
            <Row key={uuid()}>{row.map(ent =>
                <Col key={uuid()} className={'Tile'}>
                    {ent.symbol}
                </Col>)}
            </Row>)}
    </Container>;

export const inventory = inv =>
    <Container className={'Map'} key={uuid()}>
        <Row className={'py-2'}>
            {inv.map((item, i) =>
                <Col key={uuid()}>{i + 1 + ':   ' + item.toString()}</Col>)}
        </Row>
    </Container>

export const message = message => {
    return (
        <Row key={uuid()}>
            <Col key={uuid()}/><Col key={uuid()} xs={8}><code key={uuid()}>
            {message}
        </code></Col><Col/>
        </Row>
    )
}

export const controls =
    ['Movement: arrow keys ----- Pickup: space',
        'Inventory: i ------------- Equipment: e']
        .map(line => message(line));

export const invControls =
    ['Drop item: d', 'Return to game: i']
        .map(line => message(line));

export const dropControls =
    ['Select number of item to drop', 'Return to inventory: d', 'Return to game: i']
        .map(line => message(line));


export const base = state => [game(state), controls];
export const inv = player => [inventory(player.inventory), invControls];
export const drop = player => [inventory(player.inventory), dropControls];