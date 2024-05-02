import axios from 'axios';
import {React, useState} from 'react'; 
import '../Styles/chat.css'

export default function ChatPage() {

    const [userInput, setUserInput] = useState(null);

    const [message, setMessage] = useState(null);
  
    const handleUserInputChange= (e)=> {
      setUserInput(e.target.value);
    }
  
    const onSubmit=async (e)=> {
      e.preventDefault();
      const data = {
        "msgData":userInput
      }
      await axios.post("http://127.0.0.1:8000/chat", data, {
        headers: { 'Content-Type': 'application/json'}, 
      })
        .then((response)=>{
          console.log(response.data);
          setMessage(response.data.response[0][1]);
          //this CAN be a console.log()
        })
    }

    return (
      <div className="App">
      <form onSubmit={onSubmit}> 
        <input type="text" onChange={handleUserInputChange}/>
        <button type="submit">Submit</button>
      </form>
        {
          message && (
            <p>
              {message}
            </p>
          )
        }
    </div>
    )
}

