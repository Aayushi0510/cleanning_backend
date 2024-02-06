import jwt from 'jsonwebtoken';
import user from '../model/userModel.js';

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.Access_Token);

    // Check if the user exists in the database and if the access token is not empty
    const users = await user.findOne({ _id: decoded._id, accessToken: { $ne: '' } });

    if (!users) {
      return res.status(403).json({ error: 'Invalid token or user not authorized.' });
    }

    req.users = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    console.log(error);

    if (error.name === 'TokenExpiredError') {
      // Access token is expired, try to refresh using the refresh token
      try {
        const decodedRefresh = jwt.verify(token, process.env.refresh_token);
        // Set the new token in the response header or however your client expects it
        req.user = decodedRefresh; // Attach user information to the request object
        next();
      } catch (refreshError) {
        res.status(403).json({ error: 'Failed to refresh token.' });
      }
    } else {
      // Other errors, handle accordingly
      res.status(403).json({ error: 'Invalid token.' });
    }
  }
};

export default authenticateUser;
