import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Today from './components/pages/Today';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthState from './context/auth/AuthState';
import ContestState from './context/contests/ContestState';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  return (
    <AuthState>
      <ContestState>
        <Router>
          <div className='grey darken-4 pt-10'>
            <div className='white-text text-6xl text-center  py-8 font-serif '>
              Contests for life
            </div>
            <Navbar />
            <Today />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />

              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Router>
      </ContestState>
    </AuthState>
  );
};

export default App;
