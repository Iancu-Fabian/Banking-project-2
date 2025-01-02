import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import DashboardPage  from './pages/DashboardPage';
import LoansPage from './pages/LoansPage';
import ClientLoansPage from './pages/ClientLoansPage';

function App() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<DashboardPage/>} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/loans" element={<LoansPage/>} />
          <Route path="/client_loans" element={<ClientLoansPage/>} />



        </Routes>
      </Router>
    );
}

export default App;
