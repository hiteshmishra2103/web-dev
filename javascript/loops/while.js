/*
Wap to demonstrate the use of while loop by displaying
sum of numbers till a given number
*/
let a=parseInt(prompt("Enter a number upto which you want the sum: "));
let i=1;
let sum=0;
while(i<=a){   
   sum+=i;
   i++;
}
alert("The sum is: " +sum);