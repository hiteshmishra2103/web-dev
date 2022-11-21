//importing the mongodb package
const mongodb = require("mongodb");

//Code for creating a connection to mongodb server(for now: the server is localhost)inside nodejs

const MongoClient = mongodb.MongoClient;
let database;

async function connectToDatabase() {
  //"mongodb://127.0.0.1" is the url that points to the mongodb server which is
  //passed as an argument to the MongoClient.connect(), it will then give access
  // to the connected database server.
  
  const client=await MongoClient.connect("mongodb://127.0.0.1:27017");

  //client.db() will give access to the specific database on the server.
  //In this case client.db("online-shop") will give access to the online-shop database on the server.
  database = client.db("online-shop");
}

//function to check whether the database is connected or not.
function getDb(){
    if(!database){//it will throw error if database is not connected to the server.
        throw new Error("You must connect first!");
    }
    return database;
}

module.exports={
    connectToDatabase:connectToDatabase,
    getDb:getDb
}   


