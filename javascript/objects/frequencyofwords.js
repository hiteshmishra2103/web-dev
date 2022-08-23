const frequencyOfWords=(phrase)=>{
    const frequency={};
     const arrayOfWords=phrase.split(" ");
     for(const i of arrayOfWords){
        if(i in frequency){
            frequency[i]++;
        } 
        else{
            frequency[i]=1;
        }
    }
    
    console.log(frequency);
}


const phrase=prompt("Enter the phrase: ");
frequencyOfWords(phrase);