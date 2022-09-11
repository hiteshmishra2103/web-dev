const students=[
    {name:"king", subject:"javascript"}, 
    {name:"harry", subject:"machine learning"}
]

function enrollStudents(student,getStudents){
    setTimeout(function(){
        students.push(student);
        getStudents();
    }, 1000);
}
function getStudents(){
    setTimeout(function(){
        let str="";
        students.forEach(student => {
            str+=`<li>${student.name}</li>`
        });
        document.getElementById("students").innerHTML+=str;
    }
    ,3000);
}
const newstudents={name:"ironman", subject:"hindi"};
enrollStudents(newstudents, getStudents);