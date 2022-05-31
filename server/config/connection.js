const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI ||
  // For deployed version:
  'mongodb://localhost:27107/googlebooks-graphql-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  } 
  // // Use for local development:
  // 'mongodb://localhost/googlebooks', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // }
);

module.exports = mongoose.connection;
