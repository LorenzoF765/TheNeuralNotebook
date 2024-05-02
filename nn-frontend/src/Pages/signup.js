import axios from 'axios';
import {React, useState} from 'react'; 
import '../Styles/signup.css'

export default function SignUpPage() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleUsernameChange= (e)=> {
        setUsername(e.target.value);
      }

    const handlePasswordChange= (e)=> {
        setPassword(e.target.value);
      }
   
   
    const onSubmit=async (e)=> {
        e.preventDefault();
        const data = {
          "username": username, "password": password
        }
        await axios.post("http://127.0.0.1:8000/modelgen", data, {
          headers: { 'Content-Type': 'application/json'}, 
        })
      }
    
      


    return(
        <div>
            <h1>Welcome to the account creation page!</h1>
        <form onSubmit={onSubmit}>
        <input
                    type="text"
                    placeholder="Username" // Placeholder text for username
                    onChange={handleUsernameChange}
                    value={username}
                />
                <input
                    type="text" // Use 'password' type for hidden input
                    placeholder="Password" // Placeholder text for password
                    onChange={handlePasswordChange}
                    value={password}
                />
            <button type="submit">Enter</button>
        </form>
        </div>
    )

}