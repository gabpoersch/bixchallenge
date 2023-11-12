import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Company from './pages/CompanyPage';
import Employee from './pages/EmployeePage';
import Timeline from './pages/TimelinePage';
import EmployeeTimeline from './pages/EmployeeTimelinePage';
import Login from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import './styles/Table.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="table-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute> <Company /> </PrivateRoute>} />
            <Route path="/company" element={<PrivateRoute> <Company /> </PrivateRoute>} />
            <Route path="/employee" element={<PrivateRoute> <Employee /> </PrivateRoute>} />
            <Route path="/timeline" element={<PrivateRoute> <Timeline /> </PrivateRoute>} />
            <Route path="/timeline/:id" element={<PrivateRoute> <EmployeeTimeline /> </PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
