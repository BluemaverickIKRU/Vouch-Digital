import React, { useState } from 'react';

import SideMenu from '../../components/SideMenu/SideMenu';
import TableC from '../../components/TableC/TableC';
import ClientAddingForm from '../../components/ClientAddingForm/ClientAddForm';
import './Dashboard.css';

const Dashboard = () => {
  // States
  const [optionChosen, setOptionChosen] = useState(0);

  return (
    <div className="dashboard-container">
      <div className="side-menu">
        {/* Side menu */}
        <SideMenu
          optionChosen={optionChosen}
          setOptionChosen={setOptionChosen}
        />
      </div>
      {optionChosen === 0 ? (
        <div className="table">
          {/* Table containing clients details  */}
          <TableC />
        </div>
      ) : (
        <div className="client-form">
          {/* Client adding form  */}
          <ClientAddingForm />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
