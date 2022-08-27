//Adds a key value pair inside the local storage
localStorage.setItem("Name", "Harry");
localStorage.setItem("Name2", "Rohan");

let impArray=['adrak', 'pyaaz', 'bhindi'];
localStorage.setItem("sabzi", JSON.stringify(impArray));

//JSON.stringify() takes an object and returns a string.
//JSON.parse() takes a string and return an object.

//localStorage.clear() clears the entire local storage
// localStorage.clear();
//to remove the item from the localStorage
localStorage.removeItem("Name");
//getItem retrieves the item from local storage
let name=JSON.parse((localStorage.getItem("sabzi")));
console.log(name);
// console.log(JSON.parse(localStorage.getItem("sabzi")));

sessionStorage.setItem("sessionName", "Harry");
sessionStorage.setItem("sessionName2", "Rohan");
