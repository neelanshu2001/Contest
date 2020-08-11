import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, logout, user } = authContext;

  return (
    <nav
      style={{
        borderRadius: '20px 20px 0px 0px',
      }}
    >
      <div className='center-align nav-wrapper   grey darken-3 rounded-t-lg '>
        <ul className=' hide-on-med-and-down pl-15'>
          <li className='font-semibold px-2'>
            <Link to='/'>Home</Link>
          </li>
          <li className='font-semibold px-2'>
            <Link to='/about'>About</Link>
          </li>

          <li className='font-semibold px-2'>
            {isAuthenticated && !loading ? (
              <Link
                to='/'
                onClick={(e) => {
                  logout();
                }}
              >
                Logout
              </Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
        {isAuthenticated && !loading ? (
          <div
            className='text-right white-text'
            style={{ paddingRight: '10px', fontFamily: 'serif' }}
          >
            Hi {user.name}{' '}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
