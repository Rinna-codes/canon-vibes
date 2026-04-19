// contains the routers for each separeate web page

// BrowserRouter — wraps your whole app and enables routing
// Routes — a container that holds all your route definitions
// Route — defines one specific path and which component to show

import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Need to import the pages into the app component
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import SoundtrackCardPage from './pages/SoundtrackCardPage';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* This makes the router to the user Login Page */}
        <Route path="/login" element={<LoginPage />} /> 

        {/* This makes the router to the users DashboardPage */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* This makes the rotuer to the user Register Page */}
        <Route path="/register" element={<RegisterPage/>} />

        {/* This makes the router to a users Soundtrack Card Page */}
        <Route path="/soundtrackCard" element={<SoundtrackCardPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;