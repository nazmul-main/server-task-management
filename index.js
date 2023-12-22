const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.idkvt6k.mongodb.net/?retryWrites=true&w=majority`;

const TaskManegement = 'smooth_taks';

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
    // await client.connect();

    const To_do_Collection = client.db(TaskManegement).collection("to_do_task");

    //task added api 
    app.post('/task' , async (req, res) => {
      console.log(req.body);
      res.send
    })

    
    
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('task manegement is running....')
})

app.listen(port, () => {
    console.log(`task manegement is running ${port}`)
})