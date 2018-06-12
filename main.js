"use strict";
document.addEventListener("DOMContentLoaded", loadJson);
let storageArray= [];
let nameArray = [];
let jsondata;

function loadJson() {
    let data = FooBar.getData();

    //transfer data to JSON
    jsondata = JSON.parse(data);

    console.log(jsondata);

    document.querySelector("#barname").textContent = "Welcome to " + jsondata.bar.name;
    TweenLite.to("#barname", 2, {color:"#808080", scale:0.9});
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

        TweenMax.to(".status", 1, {x:20, repeat:10, yoyo:true});
        clone.querySelector(".waiting");
        clone.querySelector(".startServing");
        clone.querySelector(".reserveTap");
        clone.querySelector(".releaseTap");
        clone.querySelector(".pourBeer");
        clone.querySelector(".receivePayment");
        clone.querySelector(".endServing");
        clone.querySelector(".replaceKeg");
        if (e.statusDetail === "waiting"){
            clone.querySelector(".waiting").style.display = "block";
          }
          else if(e.statusDetail === "startServing"){
              clone.querySelector(".startServing").style.display = "block";
          }
          else if(e.statusDetail === "reserveTap"){
            clone.querySelector(".reserveTap").style.display = "block";
        }
        else if(e.statusDetail === "releaseTap"){
            clone.querySelector(".releaseTap").style.display = "block";
        }
        else if(e.statusDetail === "pourBeer"){
            clone.querySelector(".pourBeer").style.display = "block";
        }
        else if(e.statusDetail === "receivePayment"){
            clone.querySelector(".receivePayment").style.display = "block";
        }
        else if(e.statusDetail === "endServing"){
            clone.querySelector(".endServing").style.display = "block";}
          else{
              clone.querySelector(".kegpic").style.display = "block";
          }

        document.querySelector(".bartenders").appendChild(clone);
        //TweenLite.to(".bticon", 2, {rotationY:360});
        TweenLite.fromTo(".bticon",1, {opacity:0, scale:0.2}, {opacity:1, scale:1});
    });


    let storageTemplate = document.querySelector(".storage-temp").content;
    //document.querySelector(".storage").textContent = '';
    
    storageArray = [];
    nameArray = [];
    jsondata.storage.forEach((e) => {
       storageArray.push(e.amount);
       nameArray.push(e.name);
        //let amount = clone.querySelector(".beeramount").textContent = e.amount;
        // document.querySelector(".storage").appendChild(clone)
       // console.log(amount);
    });
  
    const ChartCanva2 = document.getElementById("myChart2").getContext("2d");
    let gradientStroke = ChartCanva2.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#f49080");

    const myChart2 = new Chart(ChartCanva2, {
        type: 'horizontalBar',
        data: {
            labels: nameArray,
            datasets: [{
                label: "Beer avability",
                data: storageArray,
                borderColor: gradientStroke,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth:5,
                backgroundColor: gradientStroke,
            }]
        },
        options: {
            animation: false,
            scales: {
                   
                xAxes: [{ticks: {
                    autoSkip: false,
                    beginAtZero: true,
                    fontColor: '#fff',
                    fontSize: 18
                },
                    display: true,
                    responsive: true,
                   
                }],
                yAxes: [{ ticks: {
                    beginAtZero: true,
                    fontColor: '#fff',
                    fontSize: 18,
                   // mirror: true
                    
                },
                    display: true,
                    responsive: true,

                }]
            },
        legend: {
            labels: {
                fontColor: '#FFFFFF',
                fontFamily: 'Roboto'}

        }},
    });

    let beersTemplate = document.querySelector(".beers-temp").content;
    document.querySelector(".beerinfo").textContent = '';

    let tapsArray = jsondata.taps;
    let beerArray = jsondata.beertypes;
    let mergeArray = [];
    mergeArray = tapsArray.concat(beerArray);
    //console.log(mergeArray);

    mergeArray.forEach((e) => {
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
    
})}
function closeModal() {
        modal.style.display = "none";
    }


setInterval(
    loadJson,
    10000);


