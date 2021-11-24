import { Lock } from '@mui/icons-material';

import './PasswordLogo.css';
/**
 *
 * @returns JSX
 */
const PasswordLogo = () => (
  <div className="password-header">
    <Lock />
    <h1 className="password-title">PassLock</h1>
  </div>
);

export default PasswordLogo;
