const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

let mongodbUrl='mongodb://127.0.0.1:27017';

//process.env is the object which contains all the environment variables which are exposed
//to your nodejs program by the environment
if(process.env.MONGODB_URI){
mongodbUrl=process.env.MONGODB_URI;
}

async function connect() {
  const client = await MongoClient.connect(mongodbUrl);
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
