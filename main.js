"use strict";
document.addEventListener("DOMContentLoaded", loadJson);
let myarray = [];
let jsondata;

function loadJson() {
    let data = FooBar.getData();

    //transfer data to JSON
    jsondata = JSON.parse(data);

    console.log(jsondata);

    document.querySelector("#barname").textContent = "Welcome to " + jsondata.bar.name;
    document.querySelector("#closing").textContent = "Closing time: " + jsondata.bar.closingTime;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = "Current time: " + hours + ":" + minutes;
    const queue = jsondata.queue.length;
    const serving = jsondata.serving.length;
    const ChartCanva = document.getElementById("myChart");
    //creating a chart with chart.js
    const myChart = new Chart(ChartCanva, {
        type: 'doughnut',
        data: {
            labels: ["Standing in the queue: " + jsondata.queue.length, "Being served: " + jsondata.serving.length],
            datasets: [{
                data: [queue, serving],
                backgroundColor: [
                    '#ee609c',
                    '#b966d6',
                ],
                borderColor: [
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]

            },
            legend: {
                labels: {
                    fontColor: '#FFFFFF',
                    fontFamily: 'Roboto'}

            }
        }

    });

    let mytemplate = document.querySelector(".bartenders-temp").content;
    document.querySelector(".bartenders").textContent = '';
    jsondata.bartenders.forEach((e) => {
        let clone = mytemplate.cloneNode(true);

        clone.querySelector(".name").textContent = e.name;
        clone.querySelector(".status").textContent = e.status;
        clone.querySelector(".statusdetail").textContent = e.statusDetail;
        document.querySelector(".bartenders").appendChild(clone);
    })

    let storageTemplate = document.querySelector(".storage-temp").content;
    //document.querySelector(".storage").textContent = '';
    jsondata.storage.forEach((e) => {
       myarray.push(e.amount);
        //let amount = clone.querySelector(".beeramount").textContent = e.amount;
        // document.querySelector(".storage").appendChild(clone)
       // console.log(amount);
    });
    const ChartCanva2 = document.getElementById("myChart2");
    const myChart2 = new Chart(ChartCanva2, {
        type: 'bar',
        data: {
            labels: ["lala", "...", "sth", "lala", "Being served", "sth"],
            datasets: [{
                data: myarray,
                backgroundColor: [
                    '#ee609c',
                    '#b966d6',
                    '#b966d6',
                ],
                borderColor: [
                    'transparent',
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    responsive: true

                }],
                yAxes: [{
                    display: true,
                    responsive: true,

                }]
            }
        }
    });
console.log(myarray);
    let beersTemplate = document.querySelector(".beers-temp").content;
    document.querySelector(".beerinfo").textContent = '';
    jsondata.taps.forEach((e) => {
        let clone = beersTemplate.cloneNode(true);
        clone.querySelector("#myBtn").setAttribute("data-id", e.beer); 
        clone.querySelector(".beername").textContent = e.beer;
        clone.querySelector(".levelofbeer").textContent = (e.level / e.capacity) * 100;
        //clone.querySelector(".beershortdescription").textContent = ;

        clone.querySelector("#myBtn").addEventListener("click", openModal);
        

        document.querySelector(".beerinfo").appendChild(clone);

  
        //if (modal.style.display = block) clearInterval(setInterval); //clearInterval(openModal);

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        // When the user clicks on <span> (x), close the modal
    

    }})
}

let modal = document.querySelector('#myModal');
document.querySelector(".close").addEventListener("click", closeModal);
function openModal() {
    modal.style.display = "block";
    let dataId = event.target.getAttribute("data-id");
//console.log(jsondata.beertypes);
jsondata.beertypes.forEach((e) => {
    if(dataId == e.name){
        console.log("something");
    }
    
})}
function closeModal() {
        modal.style.display = "none";
    }

setInterval(
    loadJson,
    10000);


