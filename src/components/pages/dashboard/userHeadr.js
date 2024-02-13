import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserHeader = ({ handleLogout }) => {
  return (
    <header className="header">
      {/* Your header content goes here */}
      <div className="user-info">
        <FontAwesomeIcon icon={faUser} />
        <span>User Name</span>
      </div>
      <div className="logout" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
      </div>
    </header>
  );
}

export default UserHeader;
