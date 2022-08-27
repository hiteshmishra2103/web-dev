class Employee{
    constructor(name, experience,divison){
        this.name=name;
        this.experience=experience;
        this.divison=divison;
    }
    static add(a,b){//static keyword is used when you are not using
// this keyword
        return a+b;
    }
}
console.log(Employee.add(10,20));

const king=new Employee("king", 100, 1, "javascript");
for(let i in king){
    console.log(i +": "+ king[i]);
}

Inheritance in javascript

//When a class derives from another class. The child class will
//inherit all the public and protected properties and methods from
//the parent class. In addition, it can have its own properties and
//methods.An inherited class is defined by using the extends keyword.

class programmer extends Employee{
    constructor(name, experience, divison, language, github){
        super(name, experience, divison);
        this.language=language; 
        this.github=github;
    }
}

// create a class library and implement the following:
// constructor must take booklist as the argument
// getBookList()
// issueBook(bookName, userName)
// returnbook()
const bookList=["R.D sharma", "R.S Aggarawal", "T.S Grewal", "H.K Das"]
class library{
    constructor(bookList){
    
   }
   static getBookList(bookList){
    bookList.forEach(element => {
       console.log(element); 
    });
   }
   static issueBook(bookName, userName){
    return 
   }
   static returnBook(bookName,userName){
     
   }
    }
console.log(library.getBookList(bookList))
