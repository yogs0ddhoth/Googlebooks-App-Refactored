const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({req}, res) { // function for our authenticated routes
    console.log('Auth Test 1:', req.body, req.query, req.headers);
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) { // return req if no Auth - will work for loginUser and addUser
      return req
    }

    if (req.headers.authorization) { // if token was sent through req.headers.authorization
      token = token.split(' ').pop().trim(); // ["Bearer", "<tokenvalue>"]
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('req.user:', req.user);
    } catch {
      console.log('Invalid token');
    }

    // // send to next endpoint
    // next();
    return req.user;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
