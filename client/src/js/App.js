import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/darkly/bootstrap.min.css";
import '../css/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Stonks from "./Stonks";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/stonks"} element={<Stonks/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
