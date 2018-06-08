
"use strict";
document.addEventListener("DOMContentLoaded", loadJson);




function loadJson(){
let data = FooBar.getData();

//console.log(data);


//transfer data to JSON
const jsondata = JSON.parse(data);


function show() {
    console.log(jsondata);

    document.querySelector("#barname").textContent = jsondata.bar.name;
    document.querySelector("#closing").textContent = jsondata.bar.closingTime;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = hours + ":" + minutes;
  

};

show();


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

