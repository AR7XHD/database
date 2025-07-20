const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const client = new MongoClient(process.env.MONGO_URL);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('passop'); // pick any from your Compass
    const collection = db.collection('passwords'); // replace with real one
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error('Connection error:', err);
    res.status(500).send('Error connecting to DB');
  }
});


app.post('/',async (req,res)=>{
    try {
        await client.connect();
        const db = client.db('passop'); // pick any from your Compass
        const collection = db.collection('passwords'); // replace with real one
        const data = await collection.insertOne(req.body);
        res.json(data);
    } catch (error) {
        console.error('Connection error:', error);
        res.status(500).send('Error connecting to DB');
    }
})


app.delete('/',async (req,res)=>{
    try {
        await client.connect();
        const db = client.db('passop'); // pick any from your Compass
        const collection = db.collection('passwords'); // replace with real one
        const data = await collection.deleteOne(req.body);
        res.json(data);
    } catch (error) {
        console.error('Connection error:', error);
        res.status(500).send('Error connecting to DB');
    }
})

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
});

