import MainNav from "../../pages/MainNav";
import './SwordGame.css'
import {useRef, useState} from "react";
import {Player} from "./Templates";
import * as maps from "./Maps";
import * as views from "./Views";
import Container from "react-bootstrap/Container";

function Game() {
    const p = useRef(new Player(12, 12));
    const state = useRef(maps.baseMap(p.current));
    const [view, update] = useState(views.base(state.current));

    function keyHandler(event) {
        if (event.key === 'ArrowUp' && p.current.y > 0) {
            p.current.move(state.current, [p.current.x, p.current.y - 1]);
            update(views.base(state.current));
        }

        if (event.key === 'ArrowDown' && p.current.y < state.current.length - 1) {
            p.current.move(state.current, [p.current.x, p.current.y + 1]);
            update(views.base(state.current));
        }

        if (event.key === 'ArrowLeft' && p.current.x > 0) {
            p.current.move(state.current, [p.current.x - 1, p.current.y]);
            update(views.base(state.current));
        }

        if (event.key === 'ArrowRight' && p.current.x < state.current[0].length - 1) {
            p.current.move(state.current, [p.current.x + 1, p.current.y]);
            update(views.base(state.current));
        }

        if (event.key === ' ')
            p.current.pickup(state.current, 0);

        if (event.key === '.')
            console.log(state.current[p.current.y][p.current.x]);
    }

    return (
        <Container className={'SwordGame square border'} onKeyDown={keyHandler} tabIndex={0}>
            {view}
        </Container>)
}

export default function SwordGame() {
    return(
        <>
            <MainNav/>
            <Game/>
        </>
    )
}
