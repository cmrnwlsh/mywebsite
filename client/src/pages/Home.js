import logo from "../resource/logo.svg";
import MainNav from "./MainNav";

function Home() {
    return (
        <>
            <MainNav/>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>I write code and stuff</code>
                </p>
            </div>
        </>
    )
}

export default Home;