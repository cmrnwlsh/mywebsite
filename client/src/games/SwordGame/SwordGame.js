import MainNav from "../../pages/MainNav";
import './SwordGame.css'
import {useRef, useState} from "react";
import {Player} from "./Templates";
import * as maps from "./Maps";
import * as views from "./Views";
import Container from "react-bootstrap/Container";

function Game() {
    const p = useRef(new Player(12, 12));
    const [state, screen] = [useRef(maps.baseMap(p.current)), useRef('game')];
    const [view, update] = useState(views.base(state.current));

    const mapKeys = event => {
        if (event.key === 'ArrowUp' && p.current.y > 0)
            p.current.move(state.current, [p.current.x, p.current.y - 1]);

        if (event.key === 'ArrowDown' && p.current.y < state.current.length - 1)
            p.current.move(state.current, [p.current.x, p.current.y + 1]);

        if (event.key === 'ArrowLeft' && p.current.x > 0)
            p.current.move(state.current, [p.current.x - 1, p.current.y]);

        if (event.key === 'ArrowRight' && p.current.x < state.current[0].length - 1)
            p.current.move(state.current, [p.current.x + 1, p.current.y]);

        if (event.key === ' ') p.current.pickup(state.current, 0);

        if (event.key === '.') console.log(state.current[p.current.y][p.current.x]);

        if (event.key === 'i') {
            screen.current = 'inventory';
            update(views.inv(p.current));
        } else update(views.base(state.current));
    }

    const invKeys = event => {
        if (event.key === 'd' && p.current.inventory.length > 0) {
            screen.current = 'drop';
            update(views.drop(p.current));
        }

        if (event.key === 'i') {
            screen.current = 'game';
            update(views.base(state.current));
        }
    }

    const dropKeys = event => {
        if (event.key <= p.current.inventory.length &&
            event.key > 0) {
            p.current.drop(state.current, event.key - 1)
            update(views.drop(p.current))
        }
        if (event.key === 'd') {
            screen.current = 'inventory';
            update(views.inv(p.current))
        }
        if (event.key === 'i') {
            screen.current = 'game';
            update(views.base(state.current));
        }
    }

    const keys = {'game': mapKeys, 'inventory': invKeys, 'drop': dropKeys};

    return (
        <Container className={'SwordGame square border'}
                   onKeyDown={keys[screen.current]}
                   tabIndex={0}>
            {view}
        </Container>)
}

export default function SwordGame() {
    return (
        <>
            <MainNav/>
            <Game/>
        </>
    )
}
