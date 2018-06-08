"use strict";
document.addEventListener("DOMContentLoaded", loadJson);

function loadJson() {
    const rawData = FooBar.getData();
    const data = JSON.parse(rawData);
    update(data);
    setTimeout(loadJson, 10000);
}

function update(data) {
    document.querySelector("#barname").textContent = data.bar.name;
    document.querySelector("#closing").textContent = data.bar.closingTime;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = hours + ":" + minutes;
    document.querySelector(".queue").textContent = data.queue.length;

    const bartenderDiv = document.querySelector(".bartenders");
    clean(bartenderDiv);

    let bartenderTemplate = document.querySelector(".bartenders-temp").content;
    data.bartenders.forEach((e) => {
        let clone = bartenderTemplate.cloneNode(true);
        clone.querySelector(".name").textContent = e.name;
        clone.querySelector(".status").textContent = e.status;
        bartenderDiv.appendChild(clone);
    });

    let beersTemplate = document.querySelector(".beers-temp").content;
    const beerDiv = document.querySelector(".beerinfo");
    clean(beerDiv);
    data.taps.forEach((e) => {
        let clone = beersTemplate.cloneNode(true);
        clone.querySelector(".beername").textContent = e.beer;
        clone.querySelector(".levelofbeer").textContent = (e.level / e.capacity) * 100;
        //clone.querySelector(".beershortdescription").textContent = ;
        console.log(e);
        beerDiv.appendChild(clone);
    });
}

function clean(parentNode) {
    const childrenToRemove = [];
    for (const child of parentNode.children) {
        if (child.tagName !== "TEMPLATE") {
            childrenToRemove.push(child);
        }
    }
    for (const child of childrenToRemove) {
        parentNode.removeChild(child);
    }
}