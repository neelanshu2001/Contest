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
      props.history.push('/privacy-policy');
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
    <div className='white pt-20' style={{ height: '800px' }}>
      <div className=' container grey lighten-5 py-6 border-gray-300 shadow-2xl rounded-lg border-transparent border-2'>
        <div className='container'>
          <div className=' text-center  text-blue-700  text-5xl mt-10  font-semibold'>
            Registration Form
          </div>
          <form onSubmit={onSubmit} className='mt-20 '>
            <div className='conatiner  '>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                className='grey lighten-4'
                required
              />
            </div>
            <div className='conatiner'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                value={username}
                onChange={onChange}
                className='grey lighten-4'
                required
              />
            </div>
            <div className='conatiner'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                className='grey lighten-4'
                required
              />
            </div>
            <div className='conatiner'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                className='grey lighten-4'
                required
              />
            </div>
            <div className='conatiner'>
              <label htmlFor='password2'>Confirm Password</label>
              <input
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                className='grey lighten-4'
                required
              />
            </div>
            <div className='block blue-text text-right text-sm mt-6'>
              <input
                type='submit'
                value='Register'
                className='btn blue darken-3 '
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
