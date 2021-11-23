import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 *
 * @param {string} password
 * @param {Function} callback
 */
export const hash = (password, callback) => {
  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    callback(error, hash);
  });
};
/**
 *
 * @param {string} password
 * @param {string} hash
 * @param {Function} callback
 */
export const isCorrectHash = (password, hash, callback) => {
  bcrypt.compare(password, hash, (error, result) => {
    callback(error, result);
  });
};
