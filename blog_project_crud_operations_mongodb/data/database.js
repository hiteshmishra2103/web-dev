const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  //for establishing the connection to the server as whole

  database = client.db("blog"); //for establishing the connecting to a particular
  //database in the server. for ex: here we will connect to blog
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  } 
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
