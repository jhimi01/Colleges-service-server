const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());


// var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-ia0nlto-shard-00-00.ysrfscy.mongodb.net:27017,ac-ia0nlto-shard-00-01.ysrfscy.mongodb.net:27017,ac-ia0nlto-shard-00-02.ysrfscy.mongodb.net:27017/?ssl=true&replicaSet=atlas-24z2ze-shard-0&authSource=admin&retryWrites=true&w=majority`;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ysrfscy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('college server!')
  })
  
  app.listen(port, () => {
    console.log(`College server listening on port ${port}`)
  })