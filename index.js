const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion,  ObjectId  } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ysrfscy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    // Start the Express server only after the client is connected
    app.listen(port, () => {
      console.log(`College server listening on port ${port}`);
    });

    const collegeCollection = client.db("collegesDB").collection("colleges");
    const addmissionCollection = client.db("collegesDB").collection("admission");

    // ------- all colleges --------------------------------
    app.get('/colleges', async (req, res) => {
      const result = await collegeCollection.find().toArray();
      res.send(result);
    });
    // ----------- single college details --------------------------------
    app.get('/collegedetails/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await collegeCollection.findOne(query);
        res.send(result);
    })


    // ----------------- add addmissions items --------------------------------
    app.post('/admissions', async (req, res) => {
      const body = req.body;
      const result = await addmissionCollection.insertOne(body);
      res.send(result);
    }); 
    // ---------------- get my college items --------------------------------
    app.get('/admissions', async (req, res) =>{
     const email = req.query.email;
     if (!email) {
      res.send([]);
     }
     const query = { candidateEmail: email }
     const reuslt = await addmissionCollection.find(query).toArray()
     res.send(reuslt)
    });



    app.get('/', (req, res) => {
      res.send('college server!');
    });


  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);
