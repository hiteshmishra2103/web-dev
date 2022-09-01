const { urlencoded } = require('express');
const express=require('express');
const app=express();
app.use(express.urlencoded({extended:false}));
app.listen(3000);
app.get("/currenttime",function(request,response){
    response.send(`<h1>`+new Date().toISOString()+`</h1>`);

})
//It will handle request that will be sent to
//localhost:3000/currenttime
//function will be executed for 'localhost:3000/currenttime' request
//get is the request sent by a browser if you hit enter in browser
//address bar
app.get("/",function(request,response){
    response.send(`
<form action="/store-user" method="POST">
    <label>Your name</label>
    <input type="text" name="username"></input>
    <button >Submit</button>
</form>`);
//We have not assigned a statuscode, but express will set it to
//default i.e 200(success)
});
app.post('/store-user', function(request, response){
    const username= request.body.username;
    console.log(username);
    response.send("<h1>Username Stored</h1>");
 })
