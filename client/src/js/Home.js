import logo from "../resource/logo.svg";
import Button from "react-bootstrap/Button";
import MainNav from "./MainNav";

function Home() {
    return (
        <>
            <MainNav/>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>A Fresh Start</code>
                </p>
                <Button type="button" className="btn btn-primary" href="https://reactjs.org/">React Homepage</Button>
            </div>
        </>
    )
}

export default Home;