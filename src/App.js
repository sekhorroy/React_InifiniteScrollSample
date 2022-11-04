import './App.css';
import Datatable from './components/Datatable';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        infinite pagination sample
        
        <div>
          <Datatable page={1}/>
        </div>
      </header>
      
    </div>
  );
}

export default App;
