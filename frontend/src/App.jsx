import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserRouter from './routes/UserRouter';
import AdminRouter from './routes/AdminRouter';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
