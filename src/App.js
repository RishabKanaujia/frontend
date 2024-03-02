
import './App.css';
import { BrowserRoute, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import { AuthProvider } from './context/authContext';
import SignUp from './pages/signup';
import CreateProfile from './pages/createProfile';
import UserProfile from './pages/userProfile';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<Home/>} />
      <Route path= "/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path='/createProfile' element={<CreateProfile/>} />
      <Route path='/user/:id' element={<UserProfile/>} />
      </Routes> 
     </BrowserRouter>
     </AuthProvider>

  );
}

export default App;
