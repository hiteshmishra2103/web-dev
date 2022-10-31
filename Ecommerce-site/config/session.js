const mongoDbStore=require("connect-mongodb-session");
const session = require("express-session");

function createSessionStore(){
   const mongoDbStore= mongoDbStore(session);
   new MongoDBStore({
    uri:"mongodb://127.0.0.1:27017",
    databaseName:"online-shop"
   })
}