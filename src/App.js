import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import TaskManagement from './Components/TaskManagement/taskManagement';
import Home from './Components/Home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/task' element={<TaskManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
