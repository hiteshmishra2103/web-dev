const expressSession=require("express-session");
const mongoDbStore=require("connect-mongodb-session");

const session = require("express-session");

function createSessionStore(){
   const MongoDBStore= mongoDbStore(expressSession);
   
   const store=new MongoDBStore({
    uri:"mongodb://127.0.0.1:27017",
    databaseName:"online-shop",
    collection:"sessions"
   });
   return store;
}

function createSessionConfig(){
    return {
        secret:"King-of-thrones",
        resave:false,
        saveUninitialized:false,
        store:createSessionStore(),
        cookie:{
            maxAge: 2*24*60*60*1000//for 2 days
        }
    };
}

module.exports=createSessionConfig;