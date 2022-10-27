import MainNav from "./MainNav";
import wenuhhavdat from "../resource/wenuhhavdat.gif"
function Home() {
    return (
        <>
            <MainNav />
            <div style={{display: "flex",
                         justifyContent: "center",
                         height: "100vh",
                         alignItems: "center"}}>
                <img src={wenuhhavdat} style={{height: "40vmin"}}/>
            </div>
        </>
    )
}

export default Home;