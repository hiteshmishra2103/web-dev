// const howManyLetters=()=>{
//     const phrase="king is king, titan, india, up, uk";
//     let count=0;
//     for(count in phrase){
//       count++;
//     }    
//     console.log(count); 
//     return {result:count}; 
// }
// const c=howManyLetters();
// console.log(c);

//Wap to take array elements input from user and add to an array
// and print that array to the console

// let n=parseInt(prompt("Enter the number of elements you want: "));
// let a=[];
// for(let i=0; i<n; i++){
//   let k=parseInt(prompt(`Enter the ${i+1} element of array: `));
//   a.push(k);
// }
// console.log(a);

//wap to take input from user and add elements to array untill user enters 0

// let k;
// let a=[];
// while(k!=0){
//   k=Number.parseInt(prompt("Enter the element: "));
//   a.push(k);
// }
// console.log(a); 

//filter for numbers divisible by 2 from an array

// let arr=[1,2,3,4,5,3,2,4,5,67,8,87,6,5,443];
// let a=arr.filter((element)=>{
//   return element%2 ==0;
// })
// console.log(a);

//wap to return the squares of array elements and return in an array

// let arr=[1,2,3,4,5,6];
// let a=arr.map((element)=>{
//   return element*element;
// }
// )
// console.log(a);

// let b=arr.filter((element)=>{
//   return element>3;
// })
// console.log(b);

const actors=[
  {name:"akshay", netWorth:100000},
  {name:"shahrukh", netWorth:100000000},
  {name:"salman", netWorth:100}
];
let c=actors.filter((element)=>{
  return element.netWorth>100;
})
let d=c.map((element)=>{
  return element.name
})

//Wap to sum up the networth of all the celebrities

const TotalNetWorth=actors.reduce((prev,curr)=>{
   return prev+curr.netWorth;
},0)
// let tNW=TotalNetWorth.reduce((previousElement, currentElement)=>{
//   return previousElement+currentElement;
// })
console.log(TotalNetWorth); 
// console.log(c);
// console.log(d.join(", "));

//wap to return the multiplication of array elements 

// let a=[2,3,4,5];
// let b=a.reduce((previousElement,currentElement)=> previousElement*currentElement);
// console.log(b);


