import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Bookmarked from './components/pages/Bookmarked';
import Today from './components/contest/Today';
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
              <Route exact path='/about' component={About} />
              <Route
                path='/privacy-policy'
                component={() => {
                  window.location.href =
                    'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&prompt=consent&response_type=code&client_id=951516170038-0lffk7n9l5a2joohkb6dat4is14f8ht5.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2callback';
                  return null;
                }}
              />
              <Route exact path='/bookmarks' component={Bookmarked} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route path='/' component={Home} />
            </Switch>
          </div>
        </Router>
      </ContestState>
    </AuthState>
  );
};

export default App;
