import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './Pages/home';
import ChatPage from './Pages/chat';


function App() {

  
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<HomePage/>}/>
          <Route path= "/chat" element= {<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
