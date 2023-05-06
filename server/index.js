const cors = require('cors');
const mongoose = require("mongoose");
const express = require('express');
const app = express();

const cohere = require("cohere-ai");
cohere.init("MGAAT2e4klv8XjGbVz9RadJEQ4hro2qts6PX8Dim");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({"hi":'Hello World!'});
});


app.get('/test', (req, res) => {
    res.json({"not good":"Hey again!"});
})

app.post('/testpost', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

app.post('/generate', async (req, res) => {
    const data = await req.body;
    console.log(req.body);

    const testData = {
      "food" : "beef, scallion, potatos, pepper",
      "cuisine" : "asian",
      "time" : "fast",
      "difficulty" : "easy"
    }

    const response = await cohere.generate({
      model: "command",
      prompt: "You need to provide a full response, the recipe has to be complete. Your dish title must be short and concise. You can only use a max token of 500, wrap up all necessary information within 400 tokens. At the end of your response, you must type 'DONE' on a standalone line. You need to provide a recipe in the format of dish name, ethnicity, ingredients and steps, each begin with a new line. You have to use " + testData.food + " You have to make a " + testData.cuisine + " dish, and the time it takes have to be " + testData.time + " and the difficulty must be " + testData.difficulty,
      max_tokens: 1000,
      temperature: 1,
    });

    console.log(response.body.generations[0].text);
    res.json(response.body.generations[0].text)
})

app.listen(process.env.PORT || 4000, () => { console.log("Server started")})