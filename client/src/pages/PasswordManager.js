import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Button,
  Icon,
} from '@mui/material';
import { Create } from '@mui/icons-material';

import { PasswordCard } from '../components/PasswordCard/PasswordCard';

import { FORM_STYLES } from '../constants/maps';

/**
 * @param {number} id
 * @param {[]]} passwords
 * @returns JSX
 */
const PasswordManager = ({ id, passwords: dbPasswords }) => {
  const [passwords, setNewPassword] = useState(dbPasswords);

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
    } catch (error) {
      console.error(`Problem updating: ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };
  /**
   *
   *
   */
  const onCreatePassword = async () => {
    const { title, password } = inputs;

    if (!passwords.length) {
      setNewPassword([{ title, password }]);
      return;
    }

    setNewPassword([...passwords, { title, password }]);
  };

  return (
    <>
      <Box sx={FORM_STYLES}>
        <Icon>{Create}</Icon>
        <h3>Create a new password</h3>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-title">Title</InputLabel>
            <Input
              id="standard-adornment-title"
              type="text"
              value={inputs.title}
              name="title"
              onChange={onInputChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              type={'password'}
              value={inputs.password}
              name="password"
              onChange={onInputChange}
            />
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            className="create-password-button"
            aria-label="create-password"
            onClick={onCreatePassword}
          >
            Create
          </Button>
        </div>
      </Box>
      {passwords.length > 0 && (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '50px',
            listStyleType: 'none',
            overflowY: 'auto',
          }}
        >
          {passwords.map((password, index) => (
            // TODO: check if title is unique to remove index;
            <li
              key={index}
              style={{
                minWidth: '200px',
                marginLeft: '10px',
                marginTop: '20px',
              }}
            >
              <PasswordCard
                title={password.title}
                password={password.password}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PasswordManager;
