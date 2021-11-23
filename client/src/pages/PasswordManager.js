import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input, Box, Button } from '@mui/material';

import { PasswordCard } from '../components/PasswordCard';

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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
        <ul>
          {passwords.map((password) => (
            // TODO: check if title is unique to remove the Math.random();
            <li
              key={password.title + Math.random()}
              style={{ display: 'inline' }}
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
