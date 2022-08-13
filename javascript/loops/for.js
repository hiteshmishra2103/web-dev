/*
program to print all numbers except the numbers
divisible by 3
*/
let n=parseInt(prompt("Enter the numbers upto which you want to display: "));
for(let i=0; i<=n; i++){
    if(i%3==0){
        continue;
    }
    else{
        alert(i);
    }
}