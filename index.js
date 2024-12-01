const process = require('process');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://mishrasuryansh20:IgQgQ6u95BxuyUQJ@cluster0.ruqxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let database;

async function openDatabaseConnection() {
  await client.connect();
  database = await client.db('contact_management');
}

async function closeDatabaseConnection() {
  await client.close();
}

app.get('/', (req, res) => {
  console.log('I am here now');
  fetchAllContacts(res);
});

app.get('/single-product', (req, res) => {
  fetchSingleContact(req.query, res);
});

app.post('/add-contact', (req, res) => {
  console.log(req);
  insertDataToDB(req.body, res);
  res.json('data successfully saved');
});

app.listen(port, () => {
  openDatabaseConnection();
  console.log(`Application is listening on port ${port}`);
});

async function fetchAllContacts(res) {
  try {
    let data = await database?.collection('contacts').find({}).toArray();
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

async function fetchSingleContact(queryParams, res) {
  console.log(queryParams);
  try {
    let data = await database
      ?.collection('contacts')
      .find(queryParams)
      .toArray();
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

async function insertDataToDB(body, res) {
  try {
    let response = await database?.collection('contacts').insertOne(body);
    console.log('data saved successfully');
    console.log(response);
    res.end(response);
  } catch (error) {
    console.log(error);
  }
}

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing MongoDB connection...');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing MongoDB connection...');
  await closeDatabaseConnection();
  process.exit(0);
});
