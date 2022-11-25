import MainNav from "./MainNav";

function Home() {
    return (
        <>
            <MainNav/>
            <div className="App-header">
                <h3><a href={'https://github.com/cmrnwlsh/mywebsite'}>
                    https://github.com/cmrnwlsh/mywebsite
                </a></h3>
                <p>
                    <code>I write code and stuff</code>
                </p>
            </div>
        </>
    )
}

export default Home;