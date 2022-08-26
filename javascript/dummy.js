let headingElement=document.querySelector("h1");
let message="This is singh";
headingElement.innerText=message;
headingElement.innerHTML=`<p>hello ${message}</p>`;
headingElement.style.backgroundColor="blue";
headingElement.style.color="white";
let redBox=document.getElementById("red");
let blueBox=document.querySelector("#blue");
let yellowBox=document.querySelector("#yellow");
redBox.onclick=() =>console.log("You clicked red box.");
let timesClicked={
    red:0, 
    blue:0,
    yellow:0,
};
const squares=document.querySelectorAll(".square");
squares.forEach((square)=>{
  square.onclick=()=>{
        timesClicked[square.value]+=1;
        square.innerText=timesClicked[square.value];
        console.log(`You clicked ${square.value}`);
}
})

let reset=document.querySelector(".reset");
reset.onclick=()=>{
   squares.forEach((square)=>{
    timesClicked[square.value]=0;
    square.innerText="";
   })
}
