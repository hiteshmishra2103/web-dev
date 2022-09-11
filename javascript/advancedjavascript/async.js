const fs=require("fs/promises");
//     function readFile(){
//         fs.readFile("data.txt", function(error, fileData){//function will be executed when 
//         //data.txt will be parsed
//         console.log(fileData.toString());//undefined comes when the 
//         console.log(error);
//         console.log("file parsing done!");
//     })
//     console.log("hi there!");
// }
// readFile();
setTimeout(function(){
    console.log("Hi there!");
}, 300);
console.log("done printing");