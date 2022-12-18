const friends=["rahul", "rohan"];
console.log(friends.length);
const length=friends.push("ram");
console.log(length);
console.log(friends);

const newlength=friends.unshift("vikrant");
console.log(newlength);
console.log(friends);

const deltedel=friends.pop();
console.log(deltedel);
console.log(friends);

const del=friends.shift();
console.log(del);
console.log(friends);

console.log(friends.indexOf("rohan"));

console.log(friends.includes("ram"));

