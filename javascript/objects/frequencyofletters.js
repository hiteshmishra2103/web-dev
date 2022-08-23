//Find the frequency of letters in a phrase given by
//user and store that frequency in the object and 
//print the object to the console. 
const letterFrequency=(phrase)=>{
    frequency={};
    for(const i of phrase){
        if(i in frequency){
            frequency[i]++;
        }
        else if(!(i in frequency)){
            frequency[i]=1;
        }
    }
   console.log(frequency);
}
const phrase=prompt("Enter a phrase to get its length.");
letterFrequency(phrase);