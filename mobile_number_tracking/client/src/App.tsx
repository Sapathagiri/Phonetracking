import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Track from "./pages/Track";

function App() {
  const localData = localStorage.getItem("isLogin");
  const isLoggedIn = localData === "1";

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>

          {/* Private Routes */}
          {/* {isLoggedIn && ( */}
            <>
              <Route path="/" element={<Home />} />
              <Route path="/track" element={<Track />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          {/* )} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
