const express = require ('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express()
const port =process.env.PORT || 7000;





const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.515cnfu.mongodb.net/?retryWrites=true&w=majority`;



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

    const coffeeCollection=client.db('coffeeDB').collection('coffee')
    app.post('/coffee',async(req,res)=>{
      const newCoffee= req.body;
      console.log(newCoffee);
      const result=await coffeeCollection.insertOne(newCoffee)
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


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('coffee making server is running....')
})

app.listen(port,()=>{
    console.log(`coffee server is running on port:${port}`)
})