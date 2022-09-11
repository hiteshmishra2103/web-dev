// NOTE📝: "..." are used for both rest and spread operator. The difference is that we use spread Operator
//when we have group of data as well as we know how many arguments will be passed to the function
//and we want to pass it to the function as an argument and we use "..." while calling the function in before
//the grouped data,for ex: "sumOf(...numbers)" On the other hand. We use rest operator when
//we don't know how many arguments will be passed to the function and we use "..." in function definiton
 
//Spread operator : We use this operator when we know how many arguments will
// be passed to functions, but we are passing the arguments in a group using 
// arrays and objects, For ex:-👇
function sumof(a,b){
    return a+b;
}
const mynum=[1,2,3];
console.log(sumof(...mynum));//"..." will act here as spread operator which will convert a group of 
// data into a list of arguments which are passed to the function sumof()⭐

///Rest Operator: We use this operator when we don't know how many arguments a user will pass 👇

function sumof(...numbers){//
    let result=0;
    for(const number of numbers){
        result+=number;
    }
    console.log(result);
}

sumof(1,2,3,43,4,5,5,6,6);//Here we can pass any amount of arguments