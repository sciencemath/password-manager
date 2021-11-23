import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Box,
  Button,
  Icon,
} from '@mui/material';
import { VisibilityOff, Visibility, Person, Lock } from '@mui/icons-material';

import PasswordManager from './pages/PasswordManager';

import './App.css';

/**
 *
 * @returns JSX
 */
function App() {
  const [inputText, setInputText] = useState({
    password: '',
    username: '',
    title: '',
    showPassword: false,
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
   */
  const onLogin = async () => {
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        {!isLoggedin ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginTop: '-20px',
              padding: '40px 100px',
            }}
          >
            <div className="password-header">
              <h1 className="password-title">PassLock</h1>
              <Lock />
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-username">
                  Username
                </InputLabel>
                <Input
                  id="standard-adornment-username"
                  type="text"
                  value={inputText.username}
                  name="username"
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
            <div className="login-buttons">
              <Button
                variant="contained"
                className="register-button"
                aria-label="register"
                onClick={onRegister}
              >
                Register
              </Button>
              <Button
                variant="contained"
                className="login-button"
                aria-label="login"
                onClick={onLogin}
              >
                Login
              </Button>
            </div>
          </Box>
        ) : (
          <PasswordManager
            passwords={savedPasswords.passwords}
            id={savedPasswords.id}
          />
        )}
      </div>
    </>
  );
}

export default App;
