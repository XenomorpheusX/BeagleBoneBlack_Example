/* Send Temperature Readings to a Cloud Server - Dora Avun */

//24.99.125.134:40020

/* Required modules */ 

const http = require('http'); 
const path = require('path'); 

 

/* Networking Variables */ 

 var HOST = '192.168.137.50';
 var PORT = 30000;
 

var b = require('bonescript');  //include bonescript 

 

b.pinMode('P8_08',b.OUTPUT); 

b.pinMode('P8_10',b.OUTPUT); 

function readTemp() { 

    b.analogRead('P9_40', displayTemp); 

} 

var tempC = "-1";

 

function displayTemp(reading) { 

    var millivolts = reading.value * 1800; 

    tempC = (millivolts - 500) / 10; 

    temp = (tempC * 9/5) + 32; 

    //console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

     

    if(tempC>=27){ 

        b.digitalWrite('P8_08', b.LOW); 

        b.digitalWrite('P8_10',b.LOW); 

        //console.log("  Cooling..."); 

        status ="OFF"; 

    } 

    else{ 

        b.digitalWrite('P8_08', b.HIGH); 

        b.digitalWrite('P8_10',b.HIGH); 

        //console.log("  Heating..."); 

        status = "ON"; 

    } 

} 

 

 

 

/* Ensure these Server Variables are set by your Temperature Sensing code. 

 

    temp should be set to the latest temperature reading (either C/F) 

 

     status should be set based on the latest controller logic heat source setting */ 

var forceHeat = false; 

var temp = "-1"; // DO NOT CHANGE 

var status = "-1";  // DO NOT CHANGE 

 

/* Creates a web-server and facilitates API calls */ 

const server = http.createServer((req, res) => { 

if (req.url === path.normalize('/')) { 

 

/* Not authorized to view the root resource. */ 

res.writeHead(403, { 'Content-Type': 'text/plain' }); 

res.end("You do not have permission to view this resource."); 

 

} else if (req.url === path.normalize('/api/temp')) { 

     

 var x = setInterval(readTemp,1000); 

 

/**** Return the API call result. Change X0 to your lab group number. Change units:X to either C or F ****/ 

console.log("Displaying to client: tempID:sensor_X0,status:"+status+",temp:"+temp+",units:C"); 

res.end("tempID:sensor_5,status:"+status+",temp:"+temp+",units:C"); 

 

} else if (req.url === path.normalize('/api/heat/off')) { 

 

/* Turn off force heat */ 

forceHeat = false; 

status = 'OFF'; 

 

/**** BEGIN Write code to turn heat source OFF ****/ 

 

//Write code here. 

b.digitalWrite('P8_08', b.LOW); 

b.digitalWrite('P8_10',b.LOW); 

 

/**** END Write code to turn heat source OFF ****/ 

console.log('/api/heat/off:Resource State: temp: ' + temp + ', status: ' + status); 

res.end("FORCE HEAT OFF OK"); 

 

} else if (req.url === path.normalize('/api/heat/on')) { 

 

/* Turn on force heat */ 

forceHeat = true; 

status = 'ON'; 

 

/**** BEGIN Write code to turn heat source ON ****/ 

 

// Write code here. 

b.digitalWrite('P8_08', b.HIGH); 

b.digitalWrite('P8_10',b.HIGH); 

 

/**** END Write code to turn heat source ON ****/ 

console.log('/api/heat/on:Resource State: temp: ' + temp + ', status: ' + status); 

res.end("FORCE HEAT ON OK"); 

 

} else { 

 

/* Page not found */ 

res.writeHead(404, { 'Content-Type': 'text/plain' }); 

res.end("this page doesn't exist"); 

 

} 

}); 

 

/* Start the http server. Non-blocking. */ 

server.listen(PORT,HOST); 

console.log("server listening..."); 


