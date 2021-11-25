import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Box,
  Alert,
  Icon,
} from '@mui/material';
import { VisibilityOff, Visibility, Person } from '@mui/icons-material';

import { PasswordLogo, LoginButtons } from '../components';

import { FORM_STYLES } from '../constants/maps';

import '../css/AuthLogin.css';

/**
 *
 * @returns JSX
 */
const AuthLogin = ({
  onLogin,
  onInputChange,
  onRegister,
  errors,
  inputText,
  sucessfulRegister,
}) => {
  const [isPasswordShown, onToggleShowPassword] = useState(false);

  return (
    <>
      {sucessfulRegister && (
        <Alert severity="success">
          Sucessfully Registered, you can now login!
        </Alert>
      )}
      <div className="page-container">
        <Box sx={FORM_STYLES}>
          <div>
            <PasswordLogo />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-username">
                Username
              </InputLabel>
              <Input
                type="text"
                value={inputText.username}
                name="username"
                error={Boolean(errors.username)}
                onChange={onInputChange}
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
                <FormHelperText className="form-error-text">
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
                type={isPasswordShown ? 'text' : 'password'}
                value={inputText.password}
                name="password"
                error={Boolean(errors.password)}
                onChange={onInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => onToggleShowPassword(!isPasswordShown)}
                    >
                      {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText className="form-error-text">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <LoginButtons onRegister={onRegister} onLogin={onLogin} />
        </Box>
      </div>
    </>
  );
};

export default AuthLogin;
