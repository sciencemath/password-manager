import { Button } from '@mui/material';

import './LoginButtons.css';
/**
 *
 * @param {Function} onRegister
 * @param {Function} onLogin
 * @returns JSX
 */
const LoginButtons = ({ onRegister, onLogin }) => (
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
);

export default LoginButtons;
