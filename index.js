const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


// midleware 
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.ENJOY_USER}:${process.env.ENJOY_PASS}@cluster0.c5gs6mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
    // await client.connect();

    const tourismCollection = client.db('tourismDB').collection('tourism')

    app.get('/addTours', async(req, res)=>{
        const cursor = tourismCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })



   app.post('/addTours', async(req, res)=>{
    const newTour=req.body
    console.log(newTour)
    const result = await tourismCollection.insertOne(newTour)
    res.send(result);
   
   })

   app.delete('/addTours/:id', async(req, res)=>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await tourismCollection.deleteOne(query)
    res.send(result)

   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req,res)=>{
    res.send('all tourest comming')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })