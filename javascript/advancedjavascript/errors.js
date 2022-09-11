 const fs = require("fs");

 function readFile() {
   try {
     const fileData = fs.readFileSync("data.json");
   } catch {
     console.log("An error occured!");
   }
 };
readFile();


function Employee(name,job, id){
this.name=name,
this.job=job,
this.id=id
}

const E=new Employee("king", "SDE", 210112121);
console.log(E);

class Employee{
    constructor(name,standard, rollno) {
        this.name=name,
        this.class=standard,
        this.rollno=rollno
    }
    describe(){
        console.log(`i am ${this.name} studying in class ${this.class}, my rollno is ${this.rollno}.`);
    }
}
const e=new Employee("king", "tenth", 100);
console.log(e, e.describe());

class e2 extends Employee{
    constructor(name,standard, rollno, id){
        super(name, standard,rollno);
        this.id=id
    }
    describe(){
        console.log(`i am ${this.name} studying in class ${this.class}, my rollno is ${this.rollno} and id is ${this.id}.`);
    }
}
const e3=new e2("spiderman", "spiderman", 1212, 21);
console.log(e3);

//Array Destructuring
const nam=["john", "wick"];
const[first,last]=nam;
console.log(first);
console.log(last);
const company={name:"john", class:"tenth"};
const{name}=company;
console.log(name);

