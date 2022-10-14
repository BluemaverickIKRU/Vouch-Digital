import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ErrorRoute.css';

const ErrorRoute = () => {
  const navigate = useNavigate();

  return (
    // Error page for route
    <div className="backGround">
      <p onClick={() => navigate('./signIn')} className="redirect">
        Redirect?
      </p>
    </div>
  );
};

export default ErrorRoute;
