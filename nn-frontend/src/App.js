import logo from './logo.svg';
import './App.css';

function App() {
  const onSubmit=async (e )=> {
    e.preventDefault();
    console.log("Penis!!");
  }
  return (
    <div className="App">
      <form onSubmit={onSubmit}> 

        <input type="text"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
