const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const cohere = require("cohere-ai");
cohere.init("MGAAT2e4klv8XjGbVz9RadJEQ4hro2qts6PX8Dim");


const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const databaseName = "methacks";

const password = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"

app.get('/', (req, res) => {
  res.json({"hi":'Hello World!'});
});


app.get('/test', (req, res) => {
    res.json({"not good":"Hey again!"});
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
      prompt: "You need to provide a full response, the recipe has to be complete. Your dish title must be short and concise. You can only use a max token of 500, wrap up all necessary information within 400 tokens. You need to provide a recipe in the format of dish name, ethnicity, ingredients and steps, each begin with a new line. You have to use " + data.food + " Your dish absolutely has to be in " + data.cuisine + "culture, and the time it takes have to be " + data.time + " and the difficulty must be " + data.difficulty,
      max_tokens: 1000,
      temperature: 1,
    });

    const result = {
      "result": response.body.generations[0].text
    }

    const result2 = {
      "result": "Broccoli Beef\nIngredients:\n1 pound ground beef\n1 bunch scallion\n2 potatos\n1 red pepper\nSteps:\n1. Cook the beef in a pan.\n2. Chop the scallion and the red pepper.\n3. Peel and chop the potatos,\n4. Mix everything together and enjoy\n",
    }

//use summarize for this? maybe?

    console.log(typeof(response.body.generations[0].text));
    console.log(result)
    res.json(JSON.stringify(result))
    connect(JSON.parse(JSON.stringify(result)))
})

async function insert(client, data) {
  await client.db("methacks").collection("cohere").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("1 inserted");
    db.close();
  })
}


async function connect(data){
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
 
  try {
      await client.connect();
      await insert(client, data);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}


app.listen(process.env.PORT || 27017, () => { console.log("Server started")})