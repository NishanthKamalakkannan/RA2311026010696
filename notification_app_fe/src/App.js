import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { NotificationProvider } from './state/NotificationContext';
import Navbar from './components/Navbar';
import AllNotifications from './pages/AllNotifications';
import PriorityInbox from './pages/PriorityInbox';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;