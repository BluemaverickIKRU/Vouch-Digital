import React from 'react';

import Form from '../../components/Form/Form';
import './SignIn.css';

const SignIn = () => {
  return (
    <div className="mainContainer">
      <div className="formContainer">
        {/* Form for sign in */}
        <Form />
      </div>
      <div className="asideContainer">
        {/* Content aside the form */}
        <div>
          <img
            className="banner"
            src="https://cdni.iconscout.com/illustration/premium/thumb/development-operations-doing-by-administrator-4152247-3444403.png"
            alt="Illustration of admin "
          />
        </div>
        <div>
          <h3>360&#176; Solution for Asset Management</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque alias
            laudantium voluptatum amet modi quibusdam sequi sint! Molestiae,
            illum sequi!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
