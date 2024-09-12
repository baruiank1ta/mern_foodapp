import { verify } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => { //next func calls the next item in the pipeline
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();//if it's not null it means the user is logged in

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;//verifies the tokn and puts an exception
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};
