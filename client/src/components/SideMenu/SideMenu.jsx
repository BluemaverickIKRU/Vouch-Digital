import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './Sidemenu.css';
import { logOnOff } from '../../store/userSlice';

const SideMenu = ({ optionChosen, setOptionChosen }) => {
  // Cookies
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // Options array
  const optionArr = ['View Clients', 'Add Client'];

  // Fetch data from store
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout function
  const logout = () => {
    removeCookie('token');
    dispatch(logOnOff(false));
    navigate('/signIn');
  };

  return (
    <div className="side-menu-container">
      <div className="title-and-search">
        <h3>The Vouch Digital</h3>
        <div className="side-menu-search">
          <SearchIcon fontSize="small" />
          <input type="text" placeholder="Search for modules" />
        </div>
      </div>
      <div className="side-menu-options">
        <h4 style={{ color: 'grey', marginLeft: '1em' }}>CLIENT MASTER</h4>
        <div className="options-menu">
          {/* Displaying the options */}
          {optionArr.map((i, j) => {
            return (
              <p
                key={j}
                style={
                  optionChosen === j
                    ? { backgroundColor: 'blue', color: 'white' }
                    : {}
                }
                onClick={() => setOptionChosen(j)}
              >
                {i}
              </p>
            );
          })}
        </div>
      </div>
      {/* Footer having username and mail and logout btn */}
      <div className="footer-side">
        <h3>{userInfo.userName}</h3>
        <p>{userInfo.userMail}</p>
      </div>
      {/* Logout button */}
      <div onClick={() => logout()} className="logout-btn">
        <LogoutIcon fontSize="small" />
      </div>
    </div>
  );
};

export default SideMenu;
