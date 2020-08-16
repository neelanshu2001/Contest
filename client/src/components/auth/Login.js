import React, { useContext, useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, loading, isAuthenticated, clearErrors } = authContext;
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/privacy-policy');
    }
    if (error && !loading) {
      M.toast({ html: error });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, loading, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { username, password } = user;
  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      M.toast({ html: 'Enter all Fields' });
    } else {
      login({ username, password });
      clearErrors();
    }
  };

  return (
    <div className='white pt-20 ' style={{ height: '800px' }}>
      <div className=' container grey lighten-5 py-6 border-gray-300 shadow-xl rounded-lg border-transparent '>
        <div className=' text-center  text-blue-700  text-5xl font-semibold'>
          Login
        </div>
        <form onSubmit={onSubmit}>
          <div className='container'>
            <label htmlFor='Username'>Username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className='container'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='block blue-text text-right text-sm container'>
            <input type='submit' value='Login' className='btn blue darken-3 ' />
          </div>
        </form>
        <div
          className='block blue-text text-right text-sm mt-10 container'
          style={{ marginTop: '20px' }}
        >
          <a href='/register'>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
