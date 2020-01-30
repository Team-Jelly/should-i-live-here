const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const cookieController = require('./controllers/cookieController');

const app = express();

// parse incoming json
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// flow test for incoming requests
app.use((req, res, next) => {
  console.log(`
    ********* FLOW TEST **********
    MEDTHOD: ${req.method}
    URL: ${req.url}
    BODY: ${JSON.stringify(req.body)}
  `);
  return next();
});

const apiRouter = require('./routes/apiRouter');
const userRouter = require('./routes/userRouter');

// route for all user actions
app.use('/user', userRouter);
// route for all apiRequests
app.use('/api', apiRouter);
// path for webpack build
app.use('/build', express.static(path.join(__dirname, '../build')));

// directing to root directory & setting cookie
app.get('/', cookieController.setCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});



// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('server listening on 3000');
});



// export app w/o listening to it
// https://zellwk.com/blog/endpoint-testing/
module.exports = app;