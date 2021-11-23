import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

import { hash, isCorrectHash } from './hashpassword.js'; // have to use extension here due to ESM

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection({
  user: process.env.MYSQL_USERNAME,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

/**
 *
 * @param {{}} req
 * @param {{}} res
 */
app.post('/register', (req, res) => {
  const { password, username } = req.body;

  hash(password, (error, hashedPassword) => {
    if (error) {
      sendErrorResponse(error, res, 'There was a problem hashing password');
      return;
    }

    db.query(
      'SELECT * FROM users WHERE username = ?',
      username,
      (error, result) => {
        console.log(result, error);
        if (result[0].length) {
          throw new Error('user already exists');
          res.end();
        }
      },
    );

    db.query(
      'INSERT INTO users (password, username) VALUES (?,?)',
      [hashedPassword, username],
      (error, result) => {
        if (!error) {
          sendErrorResponse(error, res, 'There was a problem inserting data');
          return;
        }
        res.send(JSON.stringify({ data: { status: 'ok' } }));
      },
    );
  });
});
/**
 *
 * @param {{}} req
 * @param {{}} res
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    username,
    (error, result) => {
      if (!result.length) {
        sendErrorResponse(error, res, 'No user found');
        return;
      }
      checkHasedPassword(result, password, res);
    },
  );
});
/**
 *
 * @param {[]} result
 * @param {string} plainTextPassword
 */
const checkHasedPassword = (result, plainTextPassword, res) => {
  const hasedPassword = result[0].password;
  isCorrectHash(plainTextPassword, hasedPassword, (error, found) => {
    if (error) {
      sendErrorResponse(error, res, `Couldn't unhash error`);
    }

    if (!found) {
      sendErrorResponse('', res, 'Password Incorrect Match');
    }

    /**
     * Thought about creating a seperate table
     * so there can be a savedpasswords table with a foriegn key
     * labeled `user_id` to the user table `id` but, for now
     * lets just make it simple, and add a column to the users table
     * labeled saved passwords.
     */
    res.send({
      data: {
        status: 'ok',
        response: {
          id: result[0].id, // this should get added automatically when creating a new user.
          passwords:
            result[0].saved_passwords === null ? [] : result[0].saved_passwords, // decode
        },
      },
    });
  });
};
/**
 *
 * @param {{}} req
 * @param {{}} res
 */
app.put('/savepassword', (req, res) => {
  const { passwords, id } = req.body;

  const hashedPasswordArray = passwords.map((password) => {
    hash(password.password, (error, hashedPassword) => {
      return { title, password: hashedPassword };
    });
  });

  console.log('hashedPasswordArray', hashedPasswordArray);

  db.query(
    'UPDATE users SET saved_passwords = ? WHERE id = ?',
    [JSON.stringify(passwords), id],
    (error, result) => {
      console.log('error', error);
      console.log('result', result);
      // if (!error) {
      //   sendErrorResponse(error, res, 'There was a problem inserting data');
      //   return;
      // }
      // res.send(JSON.stringify({ data: { status: 'ok' } }));
    },
  );
});
/**
 *
 * @param {{}} error
 * @param {{}} res
 * @param {string} message
 */
const sendErrorResponse = (error, res, message) => {
  res.send(
    JSON.stringify({
      data: {
        status: 'error',
        response: `${message} ${error}`,
      },
    }),
  );
  res.end();
};

app.listen(PORT, () => {
  console.log('server is running');
});
