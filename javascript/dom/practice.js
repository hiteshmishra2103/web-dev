//Create a ordered list which contains your favourite fast food
let a=document.createElement("h1");
let h=document.body.append(a);
let anchor=document.createElement("a");
an=document.querySelector("h1").appendChild(anchor);
anchor.href="https://india.com";
anchor.textContent="Day 1";
let alt=document.createAttribute("alt");
alt.value="Day 1";
anchor.setAttributeNode(alt);
let hori=document.createElement("hr");
let hr=document.body.append(hori);
let para=document.createElement("p");
let p=document.body.append(para);
para.textContent="This webpage is created using javascript by DOM manipulation.";
ol=document.createElement("ol");
orderedlist=document.body.append(ol);
ol.innerHTML="<li>Maggie</li>"+
"<li>Chowmein</li>"+
"<li>Vegetables</li>"+
"<li>Potatoes</li>"

