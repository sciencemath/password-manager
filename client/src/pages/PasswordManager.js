import { useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Box,
  Button,
  Icon,
} from '@mui/material';
import { Create } from '@mui/icons-material';

import { PasswordCard } from '../components/PasswordCard/PasswordCard';

import { FORM_STYLES } from '../constants/maps';

import '../css/PasswordManager.css';

/**
 * @param {number} id
 * @param {[]]} passwords
 * @returns JSX
 */
const PasswordManager = ({ id, passwords: dbPasswords }) => {
  const [passwords, setNewPassword] = useState(dbPasswords);
  const [errors, setErrors] = useState({
    title: null,
    password: null,
  });

  const [inputs, setInputs] = useState({
    title: '',
    password: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  /**
   *
   * @param {{}} event
   */
  const onInputChange = (event) => {
    setErrors({
      title: null,
      password: null,
    });
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  /**
   *
   */
  useEffect(() => {
    if (JSON.stringify(passwords) === JSON.stringify(dbPasswords)) {
      return;
    }
    onSaveNewPassword();
  }, [passwords]);
  /**
   *
   */
  const onSaveNewPassword = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('http://localhost:3001/savepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          passwords,
        }),
      });

      const data = await response.json();
      console.log('data', data);

      setInputs({
        title: '',
        password: '',
      });
    } catch (error) {
      console.error(`Problem updating: ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };
  /**
   *
   * @returns boolean
   */
  const validateCreateForm = () => {
    if (!inputs.title) {
      setErrors({ ...errors, title: 'Title cannot be blank' });
      return false;
    }

    if (!inputs.password) {
      setErrors({ ...errors, password: 'Title cannot be blank' });
      return false;
    }

    return true;
  };
  /**
   *
   *
   */
  const onCreatePassword = async () => {
    const { title, password } = inputs;

    if (!validateCreateForm()) {
      return;
    }

    if (!passwords.length) {
      setNewPassword([{ title, password }]);
      return;
    }

    setNewPassword([...passwords, { title, password }]);
  };

  return (
    <>
      <Box
        sx={{
          ...FORM_STYLES,
          padding: '30px 10px',
          minWidth: '200px',
          boxShadow: 'none',
          boxShadow: '0px 0px 2px 1px #ccc',
        }}
      >
        <div className="form-container">
          <div className="create-password-header">
            <Icon aria-label="create">{<Create />}</Icon>
            <h3>Create a new password</h3>
          </div>
          <div style={{ height: '70px' }}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-title">Title</InputLabel>
              <Input
                error={Boolean(errors.title)}
                id="standard-adornment-title"
                type="text"
                value={inputs.title}
                name="title"
                onChange={onInputChange}
                size="small"
              />
              {/* this is done like this because I don't want the form to jump when you do get an error */}
              <FormHelperText className="form-error-text">
                {Boolean(errors.title) ? errors.title : ' '}
              </FormHelperText>
            </FormControl>
          </div>
          <div style={{ height: '70px' }}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                error={Boolean(errors.password)}
                type={'password'}
                value={inputs.password}
                name="password"
                onChange={onInputChange}
              />
              <FormHelperText className="form-error-text">
                {Boolean(errors.password) ? errors.password : ' '}
              </FormHelperText>
            </FormControl>
          </div>
          <div style={{ marginLeft: '5px', marginTop: '10px' }}>
            <Button
              variant="contained"
              className="create-password-button"
              aria-label="create-password"
              onClick={onCreatePassword}
            >
              Create
            </Button>
          </div>
        </div>
      </Box>
      {passwords.length > 0 ? (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyleType: 'none',
            overflowY: 'auto',
            padding: '20px 10px',
          }}
        >
          {passwords.map((password, index) => (
            /**
             * TODO: check if title is unique or attach a uuid to each
             * of the items in the collection to remove index
             */
            <li
              key={index}
              style={{
                minWidth: '200px',
                marginLeft: '10px',
                marginTop: '20px',
                boxShadow: '0px 0px 2px 1px #1976d2',
              }}
            >
              <PasswordCard
                title={password.title}
                password={password.password}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 class="no-saved-passwords">
          Please create a password to get started.
        </h1>
      )}
    </>
  );
};

export default PasswordManager;
