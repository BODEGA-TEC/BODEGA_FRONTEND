import './App.css';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Forms from './pages/Forms';
import LogIn from './pages/LogIn';
import News from './pages/News';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/forms' element={<Forms/>}/>
          <Route path='/log-in' element={<LogIn />} />
          <Route path='/news' element={<News/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
