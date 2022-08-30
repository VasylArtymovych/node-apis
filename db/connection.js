const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// Database Name
const dbName = "db-contacts";

let collection = {};
const getCollection = () => {
  return collection;
};

async function connectMongo() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    collection = db.collection("contacts");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = {
  connectMongo,
  getCollection,
};
