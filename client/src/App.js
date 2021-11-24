import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Box,
  Button,
  Icon,
} from '@mui/material';
import { VisibilityOff, Visibility, Person } from '@mui/icons-material';

import { PasswordLogo, LoginButtons } from './components';

import PasswordManager from './pages/PasswordManager';

import { FORM_STYLES } from './constants/maps';

import './App.css';

/**
 *
 * @returns JSX
 */
const App = () => {
  const [inputText, setInputText] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState({
    id: 0,
    passwords: [],
  });
  /**
   *
   * @param {{}} event
   */
  const handleChange = (event) => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  };
  /**
   *
   */
  const handleClickShowPassword = () => {
    setInputText({
      ...inputText,
      showPassword: !inputText.showPassword,
    });
  };
  /**
   *
   */
  const onRegister = async () => {
    if (!validateFields()) {
      return;
    }
    const { username, password } = inputText;
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const { data } = await response.json();

      // if (status === 'error') {
      //   throw new Error('You have recieved an error Registering');
      // }
      /**
       * TODO load the <PasswordManagement />
       */
      // user successfully logged in
    } catch (error) {
      console.error(`You have recieved an error Registering ${error}`);
    }
  };
  /**
   *
   * @returns {boolen}
   */
  const validateFields = () => {
    if (!inputText.username) {
      setErrors({ username: 'Username cannot be blank' });
      return false;
    }

    if (!inputText.password) {
      setErrors({ password: 'Password cannot be blank' });
      return false;
    }

    setErrors({
      password: null,
      username: null,
    });

    return true;
  };
  /**
   *
   */
  const onLogin = async () => {
    if (!validateFields()) {
      return;
    }
    const { username, password } = inputText;
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const { data } = await response.json();

      /**
       * TODO: set localstorage
       */
      if (data?.status === 'ok') {
        setSavedPasswords({
          id: data.response.id,
          passwords: JSON.parse(data.response.passwords),
        });
        setIsLoggedin(true);
      }
    } catch (error) {
      console.error(`You have recieved an error logging in ${error}`);
    }
  };
  return (
    <>
      {!isLoggedin ? (
        <div className="page-container">
          <Box sx={FORM_STYLES}>
            <div>
              <PasswordLogo />
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-username">
                  Username
                </InputLabel>
                <Input
                  id="standard-adornment-username"
                  type="text"
                  value={inputText.username}
                  name="username"
                  error={errors.username}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      style={{ paddingRight: '5px' }}
                    >
                      <Icon aria-label="username">{<Person />}</Icon>
                    </InputAdornment>
                  }
                />
                {errors.username && (
                  <FormHelperText class="form-error-text">
                    {errors.username}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  type={inputText.showPassword ? 'text' : 'password'}
                  value={inputText.password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {inputText.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <LoginButtons onRegister={onRegister} onLogin={onLogin} />
          </Box>
        </div>
      ) : (
        <PasswordManager
          passwords={savedPasswords.passwords}
          id={savedPasswords.id}
        />
      )}
    </>
  );
};

export default App;
