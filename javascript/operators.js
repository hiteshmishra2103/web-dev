//-------------------Points to remember--------------------//
/*
The data type of NaN is number
The data type of an array is object
The data type of a date is object
The data type of null is object
The data type of an undefined variable is undefined. For ex: var a;
*/
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
a=100;
console.log("a==b: " + (a == "100"));
//-------What is the difference between == and === operators?-------//

/*
The main difference between the == and === operator in javascript 
is that the == operator does the type conversion of the operands 
before comparison, whereas the === operator compares the values as well as the data types of
the operands
*/
console.log("a===b(strict equality operator): " +(a==="100"));
//------------Inequality and strict inequality operator-------------//
/*
The inequality operator ( != ) checks whether its two operands are not 
equal, returning a Boolean result. Unlike the strict inequality
operator, it attempts to convert and compare operands that are 
of different types
*/
b="100"
console.log("a!=b(inequality operator): " + (a != b));
console.log("a!==b(strict inequality operator): " +(a!==b));
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
console.log("(a>9)||(b<2): " +((a>9)||(b<2)));
console.log("!(a>9)): " +(!(a>9)));
//------------BITWISE OPERATORS---------------//
/*Bit operators work on 32 bits numbers. Any numeric operand in the operation is converted into a 32 bit number.
The result is converted back to a JavaScript number.*/
/*
    Operator  Description   Example     Same as     Result   Decimal
    &	      AND	        x = 5 & 1	0101 & 0001	0001	 1
    |	      OR	        x = 5 | 1	0101 | 0001	0101	 5
    ~	      NOT	        x = ~ 5	 ~0101	1010	 10      -6
    ^	      XOR	        x = 5 ^ 1	0101 ^ 0001	0100	 4
    <<	      Left shift	x = 5 << 1	0101 << 1	1010	 10
    >>	      Right shift   x = 5 >> 1	0101 >> 1	0010	  2
*/
console.log("5&1: "+(5&1));
console.log("5|1: "+(5|1));
console.log("~5: "+(~5));
console.log("5^1: "+(5^1));
console.log("5<<1: " +(5<<1));
console.log("5>>1: " +(5>>1));
//---------------------in operator---------------------
/*The in operator returns true if the specified property is 
in the specified object, otherwise false:*/
var k=["car","lambo","BMW"];
console.log("car" in k);


