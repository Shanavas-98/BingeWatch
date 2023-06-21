import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRouter from './routes/UserRouter';
import AdminRouter from './routes/AdminRouter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<UserRouter />} />
        <Route path={'/admin/*'} element={<AdminRouter />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
