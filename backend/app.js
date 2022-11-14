const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
    );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: 'iohdfklafh',
      title: 'First server side post',
      content: 'This is coming from the server'
    },
    {
      id: 'glkdjsalh',
      title: 'Second server side post',
      content: 'This is coming from the server'
    }
  ]
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

// export the entire express app and all the middleware associated with it
module.exports = app;
