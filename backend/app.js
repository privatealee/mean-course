const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express');
});

// export the entire express app and all the middleware associated with it
module.exports = app;
