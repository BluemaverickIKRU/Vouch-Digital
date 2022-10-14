import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './page/Dashboard/Dashboard';
import SignIn from './page/SignIn/SignIn';
import ErrorRoute from './components/ErrorRoute/ErrorRoute';

const App = () => {
  // Get data from the store if user is logged in or not
  const userLogged = useSelector((state) => state.user.isLogged);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Default route '/ ' should redirect back to '/signIn' as no usecase is provided*/}
          <Route path="/" element={<Navigate to={'/signIn'} />} />

          {/* Route for the Sign In page */}
          <Route path="/signIn" element={<SignIn />} />

          {/* Route for Dashboard */}
          <Route
            path="/dashboard"
            element={userLogged ? <Dashboard /> : <Navigate to={'/signIn'} />}
          />

          {/* Not found route */}
          <Route path="*" element={<ErrorRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
