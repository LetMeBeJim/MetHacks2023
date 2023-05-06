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

app.get('/random', async (req, res) => {
  const result = await connectRandom();
  res.json(result);
})

app.post('/generate', async (req, res) => {
    const data = await req.body;
    console.log(req.body);

    // const testData = {
    //   "food" : "beef, scallion, potatos, pepper",
    //   "cuisine" : "asian",
    //   "time" : "fast",
    //   "difficulty" : "easy"
    // }

    const response = await cohere.generate({
      model: "command",
      prompt: "You need to provide a full response, the recipe has to be complete. Your dish title must be short and concise. You can only use a max token of 500, wrap up all necessary information within 400 tokens. You need to provide a recipe in the format of dish name, ethnicity, ingredients and steps, each begin with a new line. There cannot be more than 10 ingreients. You have to use " + data.food + " Your dish absolutely has to be in " + data.cuisine + "culture, and the time it takes have to be " + data.time + " and the difficulty must be " + data.difficulty,
      max_tokens: 1000,
      temperature: 1,
    });

//use summarize for this? maybe?
    const tags = await cohere.summarize({
      text: response.body.generations[0].text,
      model: 'summarize-xlarge', 
      length: 'medium',
      extractiveness: 'medium'
    })

    const result = {
      "tags": tags,
      "result": response.body.generations[0].text
    }

    res.json(JSON.stringify(result))
    connect(JSON.parse(JSON.stringify(result)))
})

app.post('/db2', async (req, res) => {
  const string = await req.body;

  console.log(string);
  const result = {
    result: string
  }
  connect(result)
  res.json({"status" : 200})
})


async function insert(client, data) {
  await client.db("methacks").collection("cohere").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("1 inserted");
    db.close();
  })
}

async function connectRandom(){
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await random(client);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    
  }
}

async function random(client){
  console.log("hi")
  const result = client.db("methacks").collection("cohere").aggregate([{ $sample: { size: 3 } }]);
  const processed = await result.toArray();
  console.log(processed);
  return processed;
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