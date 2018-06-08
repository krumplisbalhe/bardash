
"use strict";
document.addEventListener("DOMContentLoaded", loadJson);




function loadJson(){
let data = FooBar.getData();

//console.log(data);


//transfer data to JSON
const jsondata = JSON.parse(data);
console.log(jsondata);

document.querySelector(".queue").textContent = jsondata.queue.length;
    let mytemplate = document.querySelector(".bartenders-temp").content;
    jsondata.bartenders.forEach((e) => {
    let clone = mytemplate.cloneNode(true);

   console.log(clone.querySelector(".name").textContent = e.name);
    clone.querySelector(".status").textContent = e.status;
    document.querySelector(".bartenders").appendChild(clone);
    })

}

setInterval(
    function () {loadJson(); },
10000);