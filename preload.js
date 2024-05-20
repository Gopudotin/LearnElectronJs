const { ipcRenderer } = require("electron");

document.addEventListener('DOMContentLoaded', function() {
let myButton = document.getElementById("myButton");
myButton.addEventListener("click", () => {
  let txtbox  =document.getElementById("mytext");
  let txtval = txtbox.value;

  ipcRenderer.send("saveText",txtval);
})
})