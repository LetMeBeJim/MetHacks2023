const cors = require('cors');
const mongoose = require("mongoose");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({"hi":'Hello World!'});
});


app.get('/test', (req, res) => {
    res.json({"not good":"Hey again!"});
})

app.listen(process.env.PORT || 4000, () => { console.log("Server started")})