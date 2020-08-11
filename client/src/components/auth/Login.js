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
      props.history.push('/');
    }
    if (error && !loading) {
      M.toast({ html: error });
      clearErrors();
    }
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
    <div className='white' style={{ height: '800px', paddingTop: '20px' }}>
      <div className='container' style={{ marginTop: '100px' }}>
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
          <div className='object-right'>
            <input type='submit' value='Login' className='btn blue darken-3 ' />
          </div>
        </form>
        <div className='block blue-text text-right text-sm'>
          <a href='/register'>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
