import React from 'react';
import './App.scss';
import Dashboard from './pages/dashboard';
import Members from './pages/members';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemberDetails from './pages/memberDetails';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/memberDetails" element={<MemberDetails />} />
            
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
