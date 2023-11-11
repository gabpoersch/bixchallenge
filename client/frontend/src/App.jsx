import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Company from './pages/Company';
import Employee from './pages/Employee';
import Timeline from './pages/Timeline'; 
import EmployeeTimeline from './pages/EmployeeTimeline.jsx';
import './styles/Table.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="table-container">
          <Routes>
            <Route path="/company" element={<Company />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/timeline/:id" element={<EmployeeTimeline />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
