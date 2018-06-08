
"use strict";
let data = FooBar.getData();

//transfer data to JSON
const jsondata = JSON.parse(data);
<<<<<<< HEAD

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
=======
console.log(jsondata);


>>>>>>> db79db991f2d01f7bf0e7f5d31a3fb313e68fa74
