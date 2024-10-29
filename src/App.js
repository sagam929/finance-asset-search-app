import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AssetList from './pages/AssetList';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
