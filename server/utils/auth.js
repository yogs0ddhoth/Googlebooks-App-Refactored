const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({req}, res) { // function for our authenticated routes
    console.log('Auth Test 1:', req.body, req.query, req.headers);
    // allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (!token) { // return req if no token -> allows loginUser and addUser to work without token
      return req
    }
    if (req.headers.authorization) { // if token was sent through req.headers.authorization
      token = token.split(' ').pop().trim(); // ["Bearer", "<tokenvalue>"]
    }
    try { // verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // send to next endpoint
    return req.user;
  },
  signToken: function ({ username, email, _id }) { // create and return token
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
