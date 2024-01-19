// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PredictPage from './pages/predict';
import UserChatHistory from './pages/user/UserChatHistoryPage';
import UserAppointmentDetailsPage from './pages/user/UserAppointmentDetailsPage';
import ProtectedRoutesComponents from './Components/ProtectedRoutesComponent';
import ChatComponent from './Components/ChatComponent'; // Import ChatComponent

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutesComponents />}>
          <Route path="/user/chat" element={<ChatComponent />} /> {/* Add this line */}
          <Route path="/chat" element={<PredictPage />} />
          <Route path="/user/chat-history" element={<UserChatHistory />} />
          <Route
            path="/user/appointment-details"
            element={<UserAppointmentDetailsPage />}
          />
        </Route>
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
