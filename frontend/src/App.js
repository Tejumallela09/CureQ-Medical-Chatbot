import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
//publicly available
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// explictly for users, Protected Pages
// import UserChatPage from "./pages/UserChatPage";
import UserChatHistory from "./pages/user/UserChatHistoryPage"
import UserAppointmentDetailsPage from "./pages/user/UserAppointmentDetailsPage";
import ProtectedRoutesComponents from "./Components/ProtectedRoutesComponent";
function App() {
  return (
    <Router>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutesComponents/>}>
        {/* <Route path="/user" element={<UserChatPage/>}/> */}
        <Route path="/user/chat-history" element={<UserChatHistory/>}/>
        <Route path="/user/appointment-details" element={<UserAppointmentDetailsPage/>}/>
        </Route>
      </Routes>
      <FooterComponent/>
    </Router>
  );
}

export default App;
