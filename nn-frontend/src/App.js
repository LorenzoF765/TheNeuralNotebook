import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const onSubmit=async (e )=> {
    e.preventDefault();
    await axios.get("http://127.0.0.1:8000/test")
      .then((response)=>{
        console.log(response.data);
      })
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
