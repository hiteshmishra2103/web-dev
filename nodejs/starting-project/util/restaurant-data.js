const fs=require("fs");
const path=require("path")
const filePath = path.join(__dirname, "../data", "restaurants.json");

function getStoredRestaurants(){
 
  const storedRestaurantData = JSON.parse(fs.readFileSync(filePath));

  return storedRestaurantData;
}

function storedRestaurants(storableRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports={//👈 module.exports is used to mark which part of this file should
    //be made available to other files which are importing this
    storedRestaurants:storedRestaurants,
    getStoredRestaurants:getStoredRestaurants,
    filePath:filePath
};