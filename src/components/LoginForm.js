import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';

const LoginForm = ({ displayError, establishUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userToLogin = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(userToLogin)
      );

      setUsername('');
      setPassword('');
      establishUser(userToLogin);
    } catch (exception) {
      displayError('Wrong credentials');
      setTimeout(() => {
        displayError(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  displayError: PropTypes.func.isRequired,
  establishUser: PropTypes.func.isRequired
};

export default LoginForm;
