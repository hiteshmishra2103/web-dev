//without using filter()
const filter=(numbers,greaterThan)=>{
     let result =[];
     for(const i of numbers){
        if(i>greaterThan){
            result.push(i);
        }
        
     }
     return result;
}
const array=[1,2,3,4,5,6,6];
const c=filter(array,3);
console.log(c);

//using filter()
//The filter() method creates a shallow copy of a portion of a given 
//array, filtered down to just the elements from the given array that
//pass the test implemented by the provided function

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);
//From the above function the filter will return
//only those array elements whose length is greater than 6
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

