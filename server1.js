const express = require('express'); //common js module for server side
//but for react es6, import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'here changed' })
});
//dynamic port binding for heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
