import React from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';

export default (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
        <Route path = '/home' component={App} />
    </div>
    </BrowserRouter>
)
