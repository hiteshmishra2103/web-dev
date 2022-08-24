// Before learning about map() method we have to know about forEach
//loop

let a=[1,2,3,4,5,5];
a.forEach((element)=>{
  console.log(element);
})

//The difference is that the map() method creates a new array by performing
//same operation on each array element.

//Remember: We use forEach loop when we want to traverse an array
// We use map() method when we want to return an array as map() returns an array

const b=[1,2,3,4,5,6,6];
let maparr=b.map((value, index, array)=>{//map() method return an array 
    console.log(value,index, array);
    return index
}
)
console.log(maparr)//it will print the array returned my map()
//Note: Map(), Filter() do not change the original array

