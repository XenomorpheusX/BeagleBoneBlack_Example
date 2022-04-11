/* Implement a heat cycle for the heat source and temp sensor. Upload status to a cloud server. - Dora Avun */


//24.99.125.134:40020

/* Required modules */ 

const http = require('http'); 

const path = require('path'); 

 

/* Networking Variables */ 

const HOST = '192.168.137.50'; 

const PORT = 4020; 

 

var b = require('bonescript');  //include bonescript 

 

b.pinMode('P8_08',b.OUTPUT); 

b.pinMode('P8_10',b.OUTPUT); 

 

 

function readTemp() { 

    //b.analogRead('P9_40', displayTemp); 

    var millivolts = b.analogRead('P9_40') * 1800; 

    var tempC = (millivolts - 500) / 10; 

    var tempF = (tempC * 9/5) + 32; 

    //console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

    temp = tempF.toFixed(2); 

    return temp; 

} 

 

function cycleB(){ 

     b.analogRead('P9_40', heatCycle); 

} 

 

 

function heatCycle(reading) { 

    var millivolts = reading.value * 1800; 

    var tempC = (millivolts - 500) / 10; 

    var tempF = (tempC * 9/5) + 32; 

    console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

     

    if(tempC>=26){ 

        b.digitalWrite('P8_08', b.LOW); 

        b.digitalWrite('P8_10',b.LOW); 

        console.log("  Cooling..."); 

        status ="OFF"; 

    } 

    else{ 

        b.digitalWrite('P8_08', b.HIGH); 

        b.digitalWrite('P8_10',b.HIGH); 

        console.log("  Heating..."); 

        status = "ON"; 

    } 

    cycle=true; 

} 

 

function startCycle(){ 

    interval = setInterval(cycleB,1000); 

    cycle=true; 

} 

 

function stopCycle(){ 

   clearInterval(interval) 

   cycle=false; 

} 

 

 

/* Ensure these Server Variables are set by your Temperature Sensing code. 

 

    temp should be set to the latest temperature reading (either C/F) 

 

     status should be set based on the latest controller logic heat source setting */ 

var forceHeat = false; 

var temp = "-1"; // DO NOT CHANGE 

var status = 'OFF';  // DO NOT CHANGE 

var cycle = false 

var interval; 

/* Creates a web-server and facilitates API calls */ 

const server = http.createServer((req, res) => { 

if (req.url === path.normalize('/')) { 

 

/* Not authorized to view the root resource. */ 

//res.writeHead(403, { 'Content-Type': 'text/plain' }); 

res.end("0"); 

 

} else if (req.url === path.normalize('/api/sensor')) { 

     

readTemp();     

     

/**** Return the API call result. Change X0 to your lab group number. Change units:X to either C or F ****/ 

console.log("Displaying to client: tempID:sensor_50,status:"+status+",temp:"+temp+",units:F"); 

res.end(temp); 

 

} else if (req.url === path.normalize('/api/heat')) { 

 

 

console.log('/api/heat/off:Resource State: temp: ' + temp + ', status: ' + status); 

res.end(status); 

     

} else if (req.url === path.normalize('/api/sensor/heat/off')) { 

 

/* Turn off force heat */ 

forceHeat = false; 

 

 

/**** BEGIN Write code to turn heat source OFF ****/ 

 

//Write code here. 

if(cycle==false){ 

    b.digitalWrite('P8_08', b.LOW); 

    b.digitalWrite('P8_10',b.LOW);    

    res.end("1"); 

    status = 'OFF'; 

} 

else { 

    res.end("0"); 

    status='ON'; 

} 

/**** END Write code to turn heat source OFF ****/ 

//console.log('/api/heat/off:Resource State: temp: ' + temp + ', status: ' + status); 

//res.end("FORCE HEAT OFF OK"); 

 

} else if (req.url === path.normalize('/api/sensor/heat/on')) { 

 

/* Turn on force heat */ 

forceHeat = true; 

 

 

/**** BEGIN Write code to turn heat source ON ****/ 

 

// Write code here. 

if(cycle==false && temp <100){ 

    b.digitalWrite('P8_08', b.HIGH); 

    b.digitalWrite('P8_10',b.HIGH);    

    res.end("1"); 

    status = 'ON'; 

} 

else if (temp >=100){ 

    res.end("-1"); 

    status = 'OFF'; 

} 

else { 

    res.end("0"); 

    status = 'OFF'; 

     

} 

 

/**** END Write code to turn heat source ON ****/ 

//console.log('/api/heat/on:Resource State: temp: ' + temp + ', status: ' + status); 

//res.end("FORCE HEAT ON OK"); 

 

} else if (req.url === path.normalize('/api/sensor/autooff')){ 

    if (cycle == true){ 

        stopCycle(); 

        res.end("1") 

    } 

    else{ 

        res.end("0") 

    } 

} else if (req.url === path.normalize('/api/sensor/autoon')){ 

     if (cycle == false){ 

        startCycle(); 

        res.end("1") 

    } 

    else{ 

        res.end("0") 

    } 

} else { 

 

/* Page not found */ 

res.writeHead(404, { 'Content-Type': 'text/plain' }); 

res.end("this page doesn't exist"); 

 

} 

}); 

 

/* Start the http server. Non-blocking. */ 

server.listen(PORT,HOST); 

console.log("server listening..."); 
