import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user
 * @param {Object} user - User object with `_id`
 * @returns {String} JWT token
 */
export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Verifies the JWT token
 * @param {String} token
 * @returns {Object|null} Decoded token or null
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};
