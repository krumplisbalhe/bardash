"use strict";
document.addEventListener("DOMContentLoaded", loadJson);
let storageArray= [];
let nameArray = [];
let jsondata;
let lastIdCount = 0;
let beersServed = 0;


function loadJson() {
    let data = FooBar.getData();

    //transfer data to JSON
    jsondata = JSON.parse(data);

    console.log(jsondata);
    //bar section
    document.querySelector("#barname").textContent = "Welcome to " + jsondata.bar.name;
    document.querySelector("#closing").textContent = "Closing time: " + jsondata.bar.closingTime.slice(0, -3);
    //showing current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = "Current time: " + hours + ":" + minutes;
    //data for the queue
    const queue = jsondata.queue.length;
    //document.querySelector("#queue-title").textContent = "Queue";
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
                    '#5B9FD5',
                    '#A930F1',
                ],
                borderColor: [
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            easing: 'easeInCirc',
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
                    fontFamily: 'Roboto'
                }

            }
        }

    });
    //bartenders section
    document.querySelector("#bart-title").textContent = "Bartenders status";
    let mytemplate = document.querySelector(".bartenders-temp").content;
    document.querySelector(".bartenders").textContent = '';
   
   jsondata.bartenders.forEach((e) => {
        let clone = mytemplate.cloneNode(true);
        clone.querySelector(".name").textContent = e.name;
        clone.querySelector(".status").textContent = e.status;
        if (e.status === "READY"){
            clone.querySelector(".status").style.color = "#A930F1";
        }
        else if (e.status === "WORKING") {
            clone.querySelector(".status").style.color = "#5B9FD5";
        }
        
        //icons for showing the detailed status
        clone.querySelector(".waiting");
        clone.querySelector(".startServing");
        clone.querySelector(".reserveTap");
        clone.querySelector(".releaseTap");
        clone.querySelector(".pourBeer");
        clone.querySelector(".receivePayment");
        clone.querySelector(".endServing");
        clone.querySelector(".replaceKeg");
        if (e.statusDetail === "waiting") {
            clone.querySelector(".waiting").style.display = "block";
        } else if (e.statusDetail === "startServing") {
            clone.querySelector(".startServing").style.display = "block";
        } else if (e.statusDetail === "reserveTap") {
            clone.querySelector(".reserveTap").style.display = "block";
        } else if (e.statusDetail === "releaseTap") {
            clone.querySelector(".releaseTap").style.display = "block";
        } else if (e.statusDetail === "pourBeer") {
            clone.querySelector(".pourbeer").style.display = "block";
        } else if (e.statusDetail === "receivePayment") {
            clone.querySelector(".receivePayment").style.display = "block";
        } else if (e.statusDetail === "endServing") {
            clone.querySelector(".endServing").style.display = "block";
        } else {
            clone.querySelector(".kegpic").style.display = "block";
        }

        document.querySelector(".bartenders").appendChild(clone);
        //animation for the detailed status pictures
        TweenLite.fromTo(".bticon", 1, {
            opacity: 0,
            scale: 0.2
        }, {
            opacity: 1,
            scale: 1
        });
    });

    //storage section
    let storageTemplate = document.querySelector(".storage-temp").content;
    //document.querySelector(".storage").textContent = '';
    //creating arrays in order to use them as data for the graph
    storageArray = [];
    nameArray = [];
    jsondata.storage.forEach((e) => {
       storageArray.push(e.amount);
       nameArray.push(e.name);
    const ChartCanva2 = document.getElementById("myChart2").getContext("2d");
    let gradientStroke = ChartCanva2.createLinearGradient(300, 0, 100, 0);
    gradientStroke.addColorStop(0,"#A930F1" );
    gradientStroke.addColorStop(1,"#00dbde" );
    const myChart2 = new Chart(ChartCanva2, {
        type: 'horizontalBar',
        data: {
            labels: nameArray,
            datasets: [{
                label: "Kegs in storage",
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
   
    //how many people waiting in queue
    document.querySelector(".waiting").textContent = `${jsondata.queue.length}`;

    //number of people served now
    //console.log(myObject.serving);
    document.querySelector(".sold-number").textContent = beersServed;

    $(function() {

        $('.sold-number').fadeOut(700, function() {
            $('.sold-number').fadeIn(700);
        });
    
    });



   //getting a number of beers served in total
    jsondata.serving.forEach(customer=>{
        if(customer.id>lastIdCount){
            beersServed += customer.order.length;
            lastIdCount = customer.id;}
            console.log(beersServed);
    });


    let beersTemplate = document.querySelector(".beers-temp").content;
    document.querySelector(".beerinfo").textContent = '';

    jsondata.taps.forEach((tap) => {
            let clone = beersTemplate.cloneNode(true);
            clone.querySelector(".beername").textContent = tap.beer;
            let levelperc = (tap.level / tap.capacity) * 100;
            let levelhelper = (tap.level / tap.capacity)*180;
            clone.querySelector(".sc-value").textContent = levelperc;
            clone.querySelector(".sc-percentage").style.transform = "rotate("+ `${levelhelper}` +"deg)";
            clone.querySelector("#myBtn").setAttribute("data-id", tap.beer); 
            clone.querySelector("#myBtn").addEventListener("click", openModal); 
            jsondata.beertypes.forEach((beertype) =>{
         
                if (tap.beer == beertype.name){

                    clone.querySelector(".alcohol").textContent = "Alc.: " + beertype.alc + "%";
                    clone.querySelector(".category").textContent = beertype.category;
                    clone.querySelector(".beercardpicture").src = "labelimages/" + beertype.label;

                }
    
            });
            


            document.querySelector(".beerinfo").appendChild(clone);

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
    
                }}
        });
    })
}
let modal = document.querySelector('#myModal');
document.querySelector(".close").addEventListener("click", closeModal);
    function openModal() {
        modal.style.display = "block";
        let dataId = event.target.getAttribute("data-id");
        jsondata.beertypes.forEach((e) => {
            if (dataId == e.name) {
                document.querySelector('.beerlabel').src = "labelimages/" + e.label;
                document.querySelector('.beershortdescription').textContent = e.description.overallImpression;
                document.querySelector('.aroma').textContent = e.description.aroma;
                document.querySelector('.flavor').textContent = e.description.flavor;
                document.querySelector('.mouthfeel').textContent = e.description.mouthfeel;
                document.querySelector('.appearance').textContent = e.description.appearance;
            }

        })
    }
    //for closing the pop-up window
    function closeModal() {
        modal.style.display = "none";
    }

   

    setInterval(
        loadJson,
        10000);