/*
1) Create three new variables:
// -A variable that stroes the name of an online
course of your choice.
// -A variable that stores the price of that course
// -A variable that stores the three main goals that you
have, when taking this course
*/
let courseName ="Web development";
let coursePrice=499;
let courseGoals="learn full stack web development";
alert(courseName);
alert(courseGoals);
alert(coursePrice);
/*
Q2:Make an object which contain all three values from 
previous question and print(alert) all its elements to the screen.
*/
let b={
    name: courseName,
    price:coursePrice,
    goal:[courseGoals,"have fun", "make projects"],
};
alert(b.name);
alert(b.price);
alert(b.goal);
//Accessing arrays items under an object
alert(b.goal[0]);
alert(b.goal[1]);

