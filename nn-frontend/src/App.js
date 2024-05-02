import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './Pages/home';
import ChatPage from './Pages/chat';
import SignUpPage from './Pages/signup';


function App() {

  
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<HomePage/>}/>
          <Route path= "/chat" element= {<ChatPage/>}/>
          <Route path= "/signup" element= {<SignUpPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
