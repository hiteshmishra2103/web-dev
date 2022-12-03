'use strict'
 
const years=new Array(1234,23,4,2);

console.log(years[0]);

console.log(years.length);

//to output the last element of the array
console.log(years[years.length-1])

years[2]="king";
console.log(years)

//Push is used to add the elements to end of the array
let newlength=years.push("india");//push return the lenght of the new array
console.log(years)
console.log("The length of the array after pushing new element is: ",newlength);

//unshift is used to add the elements to starting of array


newlength=years.unshift("9999");
console.log(years);
console.log("The length of the array after adding new element to the start of array using unshift method is: ",newlength);

const object={
    name:"king",
    class:10,
    birthyear:2000,
    calcAge:function(birthyear){
        this.age=2031-birthyear
        return this.age;
    }
}

// console.log(object.calcAge(1991));
// console.log(object['calcAge'](1990))

// console.log(object.calcAge())



// console.log(object.age)

// // object.calcAge();
// // console.log(object.age);