const fs=require("fs/promises");
async function readFile(){//We use promises to avoid using callback functions so that
    //our code become clean and more structured.
    let fileData;
    
    try{
    fileData=await fs.readFile("data.txt")
    console.log(fileData.toString());
    console.log("file parsing done!")
}
    catch(error){
        console.log("an error occured!"+error);
    }
    
    console.log("hi there!");
}
readFile()