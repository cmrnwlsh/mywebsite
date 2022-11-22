import MainNav from "../../MainNav";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import './SwordGame.css'

export default function SwordGame() {
    const range = Array.from(Array(24))
    const grid = range.map(() => range.map(() => <Col className={'Col'}>.</Col>));

    return (
    <>
        <MainNav/>
        <Container className={'Container'}>
            {grid.map((x, i) =>
                <Row>
                    {grid[i]}
                </Row>)}
        </Container>
    </>
    )
}