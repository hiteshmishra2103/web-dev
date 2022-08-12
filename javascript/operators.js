var a = 10;
var b = 7;
console.log("Actual value of a: " + a);
console.log("Actual value of b: " + b);
console.log("Sum: " + a + b);
console.log("Multiply: " + a * b);
console.log("Subtraction: " + (a - b));
console.log("Divison: " + b / a);
console.log("Prefix addition of a: " + (++a));
console.log("Prefix subtraction of a: " + (--a));
console.log("postfix addition of a: " + (a++));
console.log("postfix subtraction of a: " + (a--));
//modulus operator
console.log("Remainder left on dividing b/a(modulus operator): " + (b % a));
//exponential operator
console.log("10 to the power 2(using exponential operator **): " + (10 ** 2));
//-----------------Assignment Operators----------//
console.log("Assignment Operators in javascript:\n");
console.log("a+=b: " + (a += b));
console.log("a-=b" + (a -= b));
console.log("a*=b: " + (a *= b));
console.log("a/=b: " + (a /= b));
console.log("a%=b: " + (a %= b));
console.log("a==b: " + (a == b));
// console.log("a===b: " +(a===100));
console.log("a!=b: " + (a != b));
console.log("a<b: " + (a < b));
console.log("a<=b: " + (a <= b));
console.log("a>b: " + (a > b));
console.log("a>=b: " + (a > b));
//Ternary Operator
var c = (a > b) ? a : b;/*if condition (a>b) is true then it will return 
a otherwise it will return b and will that value to c*/
console.log("Biggest among two numbers is: " + c);
//-------Logical operators-----//
/* 1) And Operator(&&)
   2) Or Operator(||)
   3) Not Operator(!) 
*/
var a=10;
var b=11;
console.log("(a>9)&&(b<12): " +((a>9)&&(b<12)));
console.log("(a>9)&&(b<12): " +((a>9)&&(b<12)));
console.log("(a>9)&&(b<12): " +((a>9)&&(b<12)));
