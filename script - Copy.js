// Write your JavaScript code here!
window.addEventListener("load", function() {
   //global variable initilazation
   let form = document.querySelector("form");
   let launchStat = document.getElementById("launchStatus")
   let pilotStatus = document.getElementById("pilotStatus")
   let copilotStatus = document.getElementById("copilotStatus")
   let faultyItems = document.getElementById("faultyItems")
   let fuelStatus = document.getElementById("fuelStatus")
   let cargoStatus = document.getElementById("cargoStatus")
   let randomDest =  Math.floor(Math.random()*6)
   let formSubmit = document.getElementById("formSubmit")
   
   let pilotName = ""
   let copilotName = ""
   let fuelLevel = ""
   let cargoMass = ""


   //JSON

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               response.json().then( function(json) {
                  const missionTarget = document.getElementById("missionTarget");
                  // Add HTML that includes the JSON data
                  missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[randomDest].name}</li>
                     <li>Diameter: ${json[randomDest].diameter}</li>
                     <li>Star: ${json[randomDest].star}</li>
                     <li>Distance from Earth: ${json[randomDest].distance}</li>
                     <li>Number of Moons: ${json[randomDest].moons}</li>
                  </ol>
                  <img src="${json[randomDest].image}">
                  `;
               });
            });
   

   //user imput validation
   formSubmit.addEventListener("click", function() {
      pilotName = document.querySelector("input[name=pilotName]");
      copilotName = document.querySelector("input[name=copilotName]");
      fuelLevel = document.querySelector("input[name=fuelLevel]");
      cargoMass = document.querySelector("input[name=cargoMass]");
      console.log("get" +pilotName + copilotName + fuelLevel +cargoMass)
      
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
         console.log("oops")
      }
      //(typeof pilotName.value) !== String || (typeof copilotName.value) !== String || 
      if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert("Check data types before submiting");
         // stop the form submission
         event.preventDefault();
         console.log("uh oh")
      }
      readyCheck()
   });


   //shuttle ready check
   let launchStatus = function(status){
      if(status === true){
         launchStat.innerHTML = "Shuttle is ready for launch";
         launchStat.style.color = "green" ;
      }
      else if(status === false){
         launchStat.innerHTML = "Shuttle not ready for launch";
         launchStat.style.color = "red" ;
      }
      console.log("launch status")
   }
   let faultItem = function(status){
      pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch.`;
      copilotStatus.innerHTML = `Pilot ${copilotName} is ready for launch.`;
      launchStatus(status);
      faultyItems.style.visibility = "visible";
      console.log("faultitem")
   }

   let readyCheck = function(){
      let readyFlag = true;
      if(fuelLevel < 10000){
         readyFlag = false;
         fuelStatus.innerHTML = "Fuel level too low for launch.";
      }
      if(cargoMass > 10000){
         readyFlag = false;
         cargoStatus.innerHTML = "Cargo mass too high for launch.";
      }
      faultItem(readyFlag);
      console.log("ready check")
   }
   
   
});



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
