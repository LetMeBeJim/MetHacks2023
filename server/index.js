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
const ObjectId = require('mongodb').ObjectId;

const password = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"

app.get('/', (req, res) => {
  res.json({"hi":'Hello World!'});
});

//top 5 score recipes
app.get('/top', async (req, res) => {
    const result = await connectTop();
    res.json(result)
})

app.get('/test', (req, res) => {
    res.json({"not good":"Hey again!"});
})

//randomly selected 3 recipes
app.get('/random', async (req, res) => {
  const result = await connectRandom();
  res.json(result);
})


app.post('/generate', async (req, res) => {
    const data = await req.body;
    console.log(req.body);

    // const testData = {
    //   "ingredients" : "beef, scallion, potatos, pepper",
    //   "cuisine" : "asian",
    //   "time" : "fast",
    //   "difficulty" : "easy"
    // }
    const prompt = "Provide a recipe utilizing " + data.ingredients + ". The recipe needs to be " + data.ethnicity + " cuisine. There can only be 10 max ingredients. The difficulty of this recipe should be " + data.difficulty + " and the recipe should be " + data.time + " to make. You must give this recipe a name on the first line. You must write heading for ingredients and steps. The steps must all be numbered"
    console.log(prompt)
    const response = await cohere.generate({
      model: "command",
      prompt: prompt,
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
      "result": response.body.generations[0].text,
      "score": 0
    }

    console.log(result)
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

app.get('/add/:id', async (req, res) => {
  await connectPoints(1, req.params.id);
  res.sendStatus(200)
})

app.get('/take/:id', async (req, res) => {
  await connectPoints(-1, req.params.id);
  res.sendStatus(200)
})

app.post('/comments', async (req, res) => {
  console.log("hi")
  await connectComments(req.body);
  res.sendStatus(200)
})

app.get('/comments/:id', async (req, res) => {
  const id = req.params.id;
  response = await connectGetComments(id);
  console.log(response)

  res.json(response)
})

app.get('/:id', async (req, res) => {
  console.log("hi")
  const result = await connectFind(req.params.id);
  console.log(result)
  res.json(result)
})

async function connectGetComments(id) {
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await getComments(client, id)
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function getComments(client, id) {
  const result = await client.db("methacks").collection("cohere").find({ text: { $exists: true }, entry: id })
  const processed = await result.toArray();
  return processed;
}

async function connectComments(info) {
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log(info)
    await comments(client, info)

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function comments(client, info){
  await client.db("methacks").collection("cohere").insertOne({entry: info.itemId, name: info.name, text: info.text})
}

async function connectFind(id) {
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await find(client, id);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function find(client, id) {
  const result = await client.db("methacks").collection("cohere").findOne({_id: new ObjectId(id)})
  return result
}

async function insert(client, data) {
  await client.db("methacks").collection("cohere").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("1 inserted");
    db.close();
  })
}

async function top(client) {
  const result = await client.db("methacks").collection("cohere").find().sort({ score: -1 }).limit(5);
  const processed = await result.toArray();
  console.log(processed)
  return processed;

}

async function connectTop() {
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await top(client);
    
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
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

async function connectPoints(value, id){
  const uri = "mongodb+srv://yaobojing:JimYao1234@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await points(client, value, id);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function points(client, value, id){
  await client.db("methacks").collection("cohere").findOneAndUpdate(
    {_id: new ObjectId(id)},
    { $inc: { score: value } },
    { returnOriginal: false }
  );
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