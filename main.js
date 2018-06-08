
let data = FooBar.getData();

const jsondata = JSON.parse(data);

console.log(jsondata);

let bar = document.querySelector(".bar");
console.log(bar);

bar.textContent = jsondata.bartenders["0"];


