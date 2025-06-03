import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './Pages/home';
import ChatPage from './Pages/chat';
import SignUpPage from './Pages/signup';
import LoginPage from './Pages/login';
import AccountPage from './Pages/account';
import AboutPage from './Pages/about';


function App() {

  
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<HomePage/>}/>
          <Route path= "/chat" element= {<ChatPage/>}/>
          <Route path= "/signup" element= {<SignUpPage/>}/>
          <Route path= "/login" element= {<LoginPage/>}/>
          <Route path= "/account" element= {<AccountPage/>}/>
          <Route path= "*" element= {<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
