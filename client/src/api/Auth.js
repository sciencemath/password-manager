/**
 *
 * @param {string} username
 * @param {string} password
 */
const onAuthLogin = async ({ username, password }) => {
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

    if (data?.status === 'error') {
      throw new Error(data.response);
    }

    return data;
  } catch (error) {
    console.error(
      `You have recieved an error logging in, possible user/pass mismatch ${error}`,
    );
  }
};
/**
 *
 * @param {string} username
 * @param {string} passsword
 */
const onRegisterUser = async ({ username, password }) => {
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

    if (data?.status === 'error') {
      throw new Error('Something went wrong registering');
    }
  } catch (error) {
    console.error(`You have recieved an error Registering ${error}`);
  }
};

export { onAuthLogin, onRegisterUser };
