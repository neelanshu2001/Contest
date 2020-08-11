import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    register,
    error,
    loading,
    clearErrors,
  } = authContext;
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, username, email, password, password2 } = user;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error && !loading) {
      M.toast({ html: error });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history, loading, clearErrors]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      M.toast({ html: 'Passwords dont match' });
    } else {
      register({ name, email, password, username });
      clearErrors();
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className='white' style={{ height: '800px', paddingTop: '20px' }}>
      <div className='form-container'>
        <div
          className='blue-text text-lighten-1 text-center'
          style={{ fontSize: '60px' }}
        >
          Register
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </div>

          <input
            type='submit'
            value='Register'
            className='btn btn-primary btn-block'
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
