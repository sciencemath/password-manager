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

/**
 *
 * @returns JSX
 */
const AuthLogin = ({ onLogin }) => {
  return (
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
            error={errors.username}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end" style={{ paddingRight: '5px' }}>
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
                  {inputText.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Box>
  );
};

export default AuthLogin;
