
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserRouter from './routes/UserRouter';
import AdminRouter from './routes/AdminRouter';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/*'} element={<UserRouter/>}/>
      <Route path={'/admin/*'} element={<AdminRouter/>}/>
    </Routes>
      </BrowserRouter>
  );
}

export default App;
