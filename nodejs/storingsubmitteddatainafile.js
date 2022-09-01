const fs=require("fs")
const path=require("path");//It helps in constructing paths in a way that
//will work in all operating systems, hence path package is required
//The path package makes it easy to construct the paths which will work
//in all operating systems with minimal effort
const express=require('express');
const { json } = require("express");
const app=express();
app.use(express.urlencoded({extended:false}));
app.listen(3000);
app.get("/currenttime",function(request,response){
    response.send(`<h1>`+new Date().toISOString()+`</h1>`);

})
app.get("/",function(request,response){
    response.send(`
<form action="/store-user" method="POST">
    <label>Your name</label>
    <input type="text" name="username"></input>
    <button >Submit</button>
</form>`);
});
app.post('/store-user', function(request, response){
    const username= request.body.username;
    const filepath=path.join(__dirname, "userdata", "userdata.json")
//__dirname is the built-in variable or constant that actually holds the absolute
//path to this project directory
    const fileData=fs.readFileSync(filepath);
//FileData will store the data in the form of text not in the form of
//array as written in userdata.json file so we will convert that data into 
//array by using JSON.parse() method
    const existingUserData=JSON.parse(fileData);
    existingUserData.push(username);
    fs.writeFileSync(filepath, JSON.stringify(existingUserData));
    response.send("<h1>Username Stored</h1>");
 })
 app.get("/users", function(request, response){
    const username= request.body.username;
    const filepath=path.join(__dirname, "userdata", "userdata.json")
    const fileData=fs.readFileSync(filepath);
    const existingUserData=JSON.parse(fileData);
    let responseUserData='<ul>';
    existingUserData.forEach((element) => {
        responseUserData+=`<li>${element}</li>`;
    });
    responseUserData+=`</ul>`;
    response.send(responseUserData);
})
