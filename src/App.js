import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import StudentShowcase from './pages/StudentShowcase';
import Blog from './pages/Blog';
import ParentPortal from './pages/ParentPortal';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router basename="/CSClassroom">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<StudentShowcase />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/portal"
          element={
            <PrivateRoute>
              <ParentPortal />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule-meeting"
          element={
            <PrivateRoute>
              <ScheduleMeeting />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;