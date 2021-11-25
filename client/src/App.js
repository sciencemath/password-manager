import { useState } from 'react';

import AuthLogin from './pages/AuthLogin';
import PasswordManager from './pages/PasswordManager';

import { onAuthLogin, onRegisterUser } from './api/Auth';

import './css/Global.css';

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
    register: null,
  });
  const [sucessfulRegister, setSucessfulRegister] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState({
    id: 0,
    passwords: [],
  });
  /**
   *
   * @param {{}} event
   */
  const onInputChange = (event) => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  };
  /**
   *
   */
  const resetErrors = () => {
    setErrors({
      password: null,
      username: null,
    });
  };
  /**
   *
   * @returns {boolen}
   */
  const validateFields = () => {
    if (!inputText.username) {
      setErrors({ ...errors, username: 'Username cannot be blank' });
      return false;
    }

    if (!inputText.password) {
      setErrors({ ...errors, password: 'Password cannot be blank' });
      return false;
    }

    resetErrors();
    return true;
  };
  /**
   *
   */
  const onLogin = async () => {
    if (!validateFields()) {
      return;
    }

    const data = await onAuthLogin(inputText);

    if (!data) {
      // Show error.
    }

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
  };
  /**
   *
   */
  const onRegister = async () => {
    if (!validateFields()) {
      return;
    }

    const data = await onRegisterUser(inputText);

    if (data?.status === 'ok') {
      setSucessfulRegister(true);
      setInputText({
        username: '',
        password: '',
      });
    }
  };
  return (
    <>
      {!isLoggedin ? (
        <AuthLogin
          {...{
            inputText,
            setInputText,
            errors,
            onInputChange,
            onLogin,
            onRegister,
            sucessfulRegister,
          }}
        />
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
