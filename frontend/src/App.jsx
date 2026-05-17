import './App.css';
import{ BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';    
import ChatPage from './components/ChatPage';   
import { useState } from 'react'


function App() {

  const [user,setUser] = useState(null);
  const [token,setToken] = useState("");
  return (
    <>
    <Router>      
    <Routes>
      <Route path='/' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage setUser={setUser} setToken={setToken}/>}/>
      <Route path='/chat' element={<ChatPage setUseruser={user} token={setToken}/>}/>
    </Routes>
    </Router>
      {/* <h3 className='text-3xl bg-red-200'>Chat App</h3> */}
    </>
  )
}

export default App
