import React from 'react';
import './App.scss';
import Dashboard from './pages/dashboard';
import Members from './pages/members';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemberDetails from './pages/memberDetails';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/memberDetails" element={<MemberDetails />} />
            
        </Routes>
      </BrowserRouter>
      {/* <Members/> */}
    </div>
  );
}

export default App;
