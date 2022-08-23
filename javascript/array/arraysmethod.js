const grociers=["guava","banana","apple","king", "pineapple"];
console.log(grociers);
//--array methods----

//push method: It returns the new array length
let p=grociers.push("mango")
console.log(grociers, p);

//pop method
let r= grociers.pop();//pop() method returns the popped value from array
console.log(grociers, r);

//slice method and splice() method
//slice() method
//it returns a subarray from an array and a substring from a string
console.log(grociers.slice(0,2));//starts from 0(includes 0) upto 2(excluding 2)
console.log(grociers.slice(1,5))

console.log(grociers.length)

//splice() method: It is used to add new items to an array 
//SYNTAX: splice(index position to add, no of elements to remove , elements to be added);

let spl=grociers.splice(2,3,"papaya", "orange", "leechi", "Jackfruit");
console.log(grociers, spl);

//indexOf method returns the index of a element of an array
console.log(grociers.indexOf("king"));

//arrow function in javascript

const arrowFunction=(name, color)=>{
  const person={
    name:name,
    color:color,
    netWorth:()=>{
        return this.assets+this.liabilities;
    },
};
console.log(person.name);
console.log(person.color);
}
arrowFunction("hitesh", "king")


// toString()
let num=[13,23,43,4];
let b=num.toString();
console.log(b);

//join() method//It joins all the array elements with a seperator
let c=num.join("-");
console.log(c, typeof(c));//It will return 13-23-43-4 of type string

//shift() method: It deletes the first element from
// an array and returns the deleted element

let s=num.shift();
console.log(num, s);

//unshift() method: It is used to add an element to an array at starting
//and returns the length of new array

let u=num.unshift(12);
console.log(num, u);

//delete() is used to deleted an array element from a desired index

delete num[4];
console.log(num)

//Concatenate() method is used to join two arrays

const arr=[124,34,54,3,34];
let newarray=num.concat(arr);
console.log(newarray);
let array=newarray.concat(num,arr);
console.log(array);

//sort() method: It sorts alphabetically,

array.sort()
console.log(array);
// let compare=(a,b)=>{//compare function for sorting in ascending order
//   return a-b;
// }
let compare=(a,b)=>{//compare function for sorting in descending order
  return b-a;
}

let arrb=[2,34,2,124,5,21,511,1]
arrb.sort(compare);
console.log(arrb);

//reverse(): It is used to reverse the array
let bn=[12,2,5,4,2,1];
let rev=bn.reverse();
console.log(bn, rev);

//for each loop is used for traversing arrays
bn.forEach((element)=>{
  console.log(element*element);
}
)
let result=0;
bn.forEach((element)=>{
  result=result+element;
  console.log(result);
})

//for in loop: It gives the index of an array or returns the key from an array
// Key are the index in arrays

//arrray.from() method: It is used to convert a string, html collection or other to arrays
//for ex:
let abc="singhisking";
let arr1=Array.from(abc);
arr1.forEach((i)=>{
  console.log(i);
}
)