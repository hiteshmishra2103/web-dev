const express=require('express');
const app=express();
app.listen(3000);
app.get("/currenttime",function(request,response){
    response.send(`<h1>`+new Date().toISOString()+`</h1>`);

})//It will handle request that will be sent to
//localhost:3000/currenttime
//function will be executed for 'localhost:3000/currenttime' request
//get is the request sent by a browser if you hit enter in browser
//address bar
app.get("/",function(request,response){
    response.send(`<h1>Hello World</h1>`);

})

const express=require("express");
function handleRequest(request, response) {
  if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Hello World!</h1>");
  }
  else if(request.url==='/timestamp'){
    response.end(`<h1>`+new Date().toISOString()+`</h1>`);
  }
}
// const server = http.createServer(handleRequest);
// //Whenever a request is reaching to NodeJs server, NodeJs will execute the function (here
// //that function is handleRequest) for us and it will pass in an object(request) with more data
// //about the request and another object(response object) that allow us to send back a
// //response, that's all done automatically by NodeJs.
// server.listen(3000); //3000 is a port where we want to listen to incoming request. 80 and 443 are
// //the default ones
// //statusCode tell the browser whether the request succeded or not
// //200=> is used for success and 404 for failure
// //401=> is used to signify client side error! the requesting client is not authorised to access
// //the requested resource/URL(for ex: In case the user is not logged in to a site, he is
// //not allowed to access the site)
// //500=> This is used when the user request was valid but something went wrong from the server-side
