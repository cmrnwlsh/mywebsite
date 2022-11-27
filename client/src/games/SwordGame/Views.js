import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const game = grid =>
    <Container className={'Map'}>
        {grid.map((row) =>
            <Row>{row.map((ent) =>
                <Col className={'Tile'}>
                    {ent.symbol}
                </Col>)}
            </Row>)}
    </Container>;

export const message = (message) =>
    <Row>
        <Col/><Col xs={8}><code>
            {message}
        </code></Col><Col/>
    </Row>;

export const controls =
    ['Movement: Arrow Keys',
     'Pickup: Space',
     'Inventory: i'].map(line => message(line))

export const base = state => [game(state), controls]