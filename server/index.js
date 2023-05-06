const cors = require('cors');
const mongoose = require("mongoose");
const express = require('express');
const app = express();

const cohere = require("cohere-ai");
cohere.init("MGAAT2e4klv8XjGbVz9RadJEQ4hro2qts6PX8Dim");



app.use(cors());

app.get('/', (req, res) => {
  res.json({"hi":'Hello World!'});
});


app.get('/test', (req, res) => {
    res.json({"not good":"Hey again!"});
})

app.post('/generate', (req, res) => {
    const data = req.body;
    console.log('Received Data:', data);
})

app.listen(process.env.PORT || 4000, () => { console.log("Server started")})