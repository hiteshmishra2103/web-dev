const howManyLetters=()=>{
    const phrase="king is king, titan, india, up, uk";
    let count=0;
    for(count in phrase){
      count++;
    }    
    console.log(count); 
    return {result:count}; 
}
const c=howManyLetters();
console.log(c);