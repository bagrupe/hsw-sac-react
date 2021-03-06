import './App.css';
import AppRouter from './AppRouter';

function App(props) {

  const url = props.url ?? "http://localhost:7071/api/iban"

  return (
    <div className="App">
      <header className="App-header">
        <h1>IBAN Tools</h1>
      </header>
      <div className="App-body">
        <AppRouter url={url}/>
      </div>
    </div>
  );
}

export default App;
