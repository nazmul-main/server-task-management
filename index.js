const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    app.post('/task', async (req, res) => {
      const task = req.body
      const result = await To_do_Collection.insertOne(task);
      console.log(result);
      res.send(result);
    })

    app.get('/all_task', async (req, res) => {
      const cursor = To_do_Collection.find()
      const result = await cursor.toArray()
      res.send(result);
    });

    app.get("/todo_task_filter", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email, }
      const result = await To_do_Collection.find(query).toArray();
      res.send(result);
    })

    // update
    app.put('/task_update/:id', async (req, res) => {
      const id = req.params.id;
      const update = req.body
      console.log(id, update);
      const filter = { _id: new ObjectId(id) }
      const option = { upsert: true }
      const task = {
        $set: {

          title:update.title, 
          description: update.description, 
          date: update.date, 
          priority: update.priority, 
         
        }
      }
      const result = await To_do_Collection.updateOne(filter, task, option);
      res.send(result);
      console.log(result);
    })


    /* delete */

    app.delete('/all_task/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await To_do_Collection.deleteOne(query);
      res.send(result)
    });



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