const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

let mongodbUrl='mongodb://127.0.0.1:27017';

//process.env is the object which contains all the environment variables which are exposed
//to your nodejs program by the environment
if(process.env.MONGODB_URL){
mongodbUrl=process.env.MONGODB_URL;
}

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db('deployment');
}

function getDb() {
  if (!database) {
    throw new Error('No database connected!');
  }
  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
