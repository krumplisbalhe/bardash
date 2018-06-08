"use strict";
let data = FooBar.getData();

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