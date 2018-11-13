const express = require('express'); //common js module for server side
//but for react es6, import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'here are you!!' })
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
