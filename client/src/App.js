import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/darkly/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>A Fresh Start</code>
        </p>
        <Button type="button" className="btn btn-primary" href="https://reactjs.org/">React Homepage</Button>
      </header>
    </div>
  );
}

export default App;
