const express = require("express");
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3000;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dgg2e.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());
app.use(cors());
async function run() {
  try {
    // await client.db("admin").command({ ping: 1 });

    const database = client.db("VanLifeDB");
    const vansCollection = database.collection("Vans");

    // find all vans
    app.get("/vans", async (req, res) => {
      const cursor = vansCollection.find({});
      const vans = await cursor.toArray();
      res.json({ vans: vans });
    });

    app.get("/vans/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log(id);
      const query = { id: id };
      const van = await vansCollection.findOne(query);
      //   const vans = await cursor.toArray();
      res.json({ vans: van });
    });

    // host vans
    app.get("/host/vans", async (req, res) => {
      const query = { hostId: "123" };
      const cursor = vansCollection.find(query);
      const vans = await cursor.toArray();
      res.json({ vans: vans });
    });

    app.get("/host/vans/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log(id);
      const query = { id: id, hostId: "123" };
      const van = await vansCollection.findOne(query);

      //   const vans = await cursor.toArray();
      res.json({ vans: van });
    });

    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Vanlife server");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
