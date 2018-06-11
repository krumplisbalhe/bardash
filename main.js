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
        clone.querySelector(".workingpic");
        clone.querySelector(".kegpic");
        clone.querySelector(".waitingpic");
        if (e.statusDetail === "waiting"){
            clone.querySelector(".workingpic").style.display = "none";
            clone.querySelector(".kegpic").style.display = "none";
          }
          else if(e.statusDetail === "replaceKeg"){
              clone.querySelector(".workingpic").style.display = "none";
              clone.querySelector(".waitingpic").style.display = "none";
          }
          else{
              clone.querySelector(".kegpic").style.display = "none";
              clone.querySelector(".waitingpic").style.display = "none";
  
          }

        document.querySelector(".bartenders").appendChild(clone);
       
    
    })

    let storageTemplate = document.querySelector(".storage-temp").content;
    //document.querySelector(".storage").textContent = '';
    
    myarray = [];

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

    let tapsArray = jsondata.taps;
    let beerArray = jsondata.beertypes;
    let mergeArray = [];
    mergeArray = tapsArray.concat(beerArray);
    console.log(mergeArray);

    mergeArray.forEach((e) => {
        console.log(e.name);
//e.beer == undefined
        if(e == null){
            document.querySelector(".onebeer").style.display = "none";
        }else{
            let clone = beersTemplate.cloneNode(true);
            clone.querySelector(".alcohol").textContent = e.alc;
            clone.querySelector("#myBtn").setAttribute("data-id", e.beer); 
            clone.querySelector(".beername").textContent = e.beer;
            clone.querySelector(".levelofbeer").textContent = (e.level / e.capacity) * 100;
            clone.querySelector("#myBtn").addEventListener("click", openModal);
            document.querySelector(".beerinfo").appendChild(clone);
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
    
                }
            }
    }
    
    })
}

let modal = document.querySelector('#myModal');
document.querySelector(".close").addEventListener("click", closeModal);
function openModal() {
    modal.style.display = "block";
    let dataId = event.target.getAttribute("data-id");
//console.log(jsondata.beertypes);
jsondata.beertypes.forEach((e) => {
    if(dataId == e.name){
        document.querySelector('.beerlabel').src = "labelimages/" + e.label;
        document.querySelector('.beershortdescription').textContent = e.description.overallImpression;
        document.querySelector('.aroma').textContent = e.description.aroma;
        document.querySelector('.flavor').textContent = e.description.flavor;
        document.querySelector('.mouthfeel').textContent = e.description.mouthfeel;
        document.querySelector('.appearance').textContent = e.description.appearance;
    }
    
})}
function closeModal() {
        modal.style.display = "none";
    }


setInterval(
    loadJson,
    10000);


