const express=require("express");

const { __esModule } = require("uuid");

const fileSystem=require("fs");

const path=require("path");

const filePath = path.join(__dirname, "../data", "restaurants.json");

//⭐==>You can also import your custom code using require() method as 👇 
const resData=require("../util/restaurant-data");
//to import the restaurant-data built by us

const router=express.Router();



router.get("/restaurants", function (request, response) {
    const filePath = path.join(__dirname, "../data", "restaurants.json");
    const restaurantData = JSON.parse(fileSystem.readFileSync(filePath));
    restaurantData.sort(function(resA, resB){
        if(resA.name>resB.name){
            return 1;
        }
            return -1;
    });
    const numberOfRestaurants = JSON.parse(fileSystem.readFileSync(filePath))
      .length;


    response.render("restaurants", {
      numberOfRestaurants: numberOfRestaurants,
      restaurants: restaurantData,
  
    });
  });
  
  
  
  
  router.post("/recommend", function (request, response) {
    const restaurant = request.body;
    restaurant.id=uuid.v4();//This will assign unique id's to the resturants
    const storedRestaurantData=resData.getStoredRestaurants();
  
    storedRestaurantData.push(restaurant);
  
    resData.storedRestaurants(storedRestaurantData);
  
    fileSystem.writeFileSync(filePath, JSON.stringify(storedRestaurantData));
    response.redirect("/confirm");
  });
  
  
  router.get("/restaurants/:id", function (request, response) {
    //dynamic route
    const restaurantId = request.params.id; //params itself contains an object which will have any dynamic placeholders
    //that we define as properties as keys
    // const filePath = path.join(__dirname, "data", "restaurants.json");
    // const restaurantData = JSON.parse(fileSystem.readFileSync(filePath));
    
    const restaurantData=getStoredRestaurants();
    
    for (const restaurant of restaurantData){
      if(restaurant.id==restaurantId){
        response.render("restaurant-detail", {restaurant:restaurant});
        return;//to exit the function execution if the id of restaurant matches      
      }
    }
    response.status(404).render("404"); //to show the 404 error page if the restaurant page is not found.
  });

module.exports=router;