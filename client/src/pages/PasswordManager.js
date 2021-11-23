import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input, Box, Button } from '@mui/material';

/**
 * @param {JSON} savedPasswords
 * @returns JSX
 */
const PasswordManager = ({ savedPasswords }) => {
  const [passwords, setNewPassword] = useState({
    id: savedPasswords.id,
    savedPasswords: savedPasswords.passwords,
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
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  /**
   *
   */
  useEffect(() => {
    if (JSON.stringify(passwords) === JSON.stringify(savedPasswords)) {
      return;
    }
    onUpdatePassword();
  }, [passwords]);
  /**
   *
   */
  const onUpdatePassword = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('http://localhost:3001/savepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: passwords.id,
          passwords: passwords.savedPasswords,
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

    if (!passwords.savedPasswords || !passwords.savedPasswords.length) {
      setNewPassword({
        id: passwords.id,
        savedPasswords: [{ title, password }],
      });
      return;
    }

    setNewPassword({
      id: passwords.id,
      savedPasswords: [...passwords.savedPasswords, { title, password }],
    });
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
      {passwords.savedPasswords.length > 0 && (
        <ul>
          {passwords.savedPasswords.map((password) => (
            <li>
              <p>
                title: {password.title}
                password: {password.password}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PasswordManager;
