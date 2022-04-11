//The Cloud IP: 10.100.113.44, port:4020
//AuthServer IP: 10.100.113.44, AuthServer port 13000

/*This time, we are accessing to an authorized server, which requires a token,
secretkey and authpassword. - Dora Avun*/ 


//10.100.113.44:4020

/* Required modules */ 

const http = require('http'); 

const path = require('path'); 

 

/* Networking Variables */ 

const HOST = '192.168.137.50'; 

const PORT = 30000; 

 

var b = require('bonescript');  //include bonescript 
var tempC = "-1";
var tempF = "-1";

var rawtemp = "-1"; 
var authtoken = "-1"; 
var secretkey = "…"; 
var authuname = "davun"; 
var authpword = "password5"; 
var count = 0; 

 

b.pinMode('P8_08',b.OUTPUT); 

b.pinMode('P8_10',b.OUTPUT); 

 

function readTemp() 
{ 

    b.analogRead('P9_40', displayTemp); 
    rawtemp = tempF.toString(); 

} 

// function readTemp() { 

//     //b.analogRead('P9_40', displayTemp); 

//     var millivolts = b.analogRead('P9_40') * 1800; 

//     var tempC = (millivolts - 500) / 10; 

//     var tempF = (tempC * 9/5) + 32; 

//     //console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

//     temp = tempF.toFixed(2); 

//     return temp; 

// } 

function displayTemp(reading) { 

    var millivolts = reading.value * 1800; 

    tempC = (millivolts - 500) / 10; 

    tempF = (tempC * 9/5) + 32; 

    console.log("Temp C=" + tempC + "   Temp F=" + tempF); 
}

// function cycleB(){ 

//      b.analogRead('P9_40', heatCycle); 

// } 

 

 

// function heatCycle(reading) { 

//     var millivolts = reading.value * 1800; 

//     var tempC = (millivolts - 500) / 10; 

//     var tempF = (tempC * 9/5) + 32; 

//     console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

     

//     if(tempC>=26){ 

//         b.digitalWrite('P8_08', b.LOW); 

//         b.digitalWrite('P8_10',b.LOW); 

//         console.log("  Cooling..."); 

//         status ="OFF"; 

//     } 

//     else{ 

//         b.digitalWrite('P8_08', b.HIGH); 

//         b.digitalWrite('P8_10',b.HIGH); 

//         console.log("  Heating..."); 

//         status = "ON"; 

//     } 

//     cycle=true; 

// } 

 

// function startCycle(){ 

//     interval = setInterval(cycleB,1000); 

//     cycle=true; 

// } 

 

// function stopCycle(){ 

//   clearInterval(interval) 

//   cycle=false; 

// } 

 

 

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

 

} 
else if (req.url === path.normalize('/api/heat')) 
{ 
    console.log('/api/heat/off:Resource State: temp: ' + temp + ', status: ' + status); 
    res.end(status); 
} 

else if (req.url === path.normalize('/api/sensor/heat/off')) 
{ 

/* Turn off force heat */ 

forceHeat = false; 
}

 

 

/**** BEGIN Write code to turn heat source OFF ****/ 

 

//Write code here. 

// if(cycle==false){ 

//     b.digitalWrite('P8_08', b.LOW); 

//     b.digitalWrite('P8_10',b.LOW);    

//     res.end("1"); 

//     status = 'OFF'; 

// } 

// else { 

//     res.end("0"); 

//     status='ON'; 

// } 

/**** END Write code to turn heat source OFF ****/ 

//console.log('/api/heat/off:Resource State: temp: ' + temp + ', status: ' + status); 

//res.end("FORCE HEAT OFF OK"); 

 


else if (req.url === path.normalize('/api/sensor/heat/on')) 
{ 

/* Turn on force heat */ 

forceHeat = true; 
}
 

 

/**** BEGIN Write code to turn heat source ON ****/ 

 

// // Write code here. 

// if(cycle==false && temp <100){ 

//     b.digitalWrite('P8_08', b.HIGH); 

//     b.digitalWrite('P8_10',b.HIGH);    

//     res.end("1"); 

//     status = 'ON'; 

// } 

// else if (temp >=100){ 

//     res.end("-1"); 

//     status = 'OFF'; 

// } 

// else { 

//     res.end("0"); 

//     status = 'OFF'; 

     

// } 

 

/**** END Write code to turn heat source ON ****/ 

//console.log('/api/heat/on:Resource State: temp: ' + temp + ', status: ' + status); 

//res.end("FORCE HEAT ON OK"); 

 

// else if (req.url === path.normalize('/api/sensor/autooff')){ 

//     if (cycle == true){ 

//         stopCycle(); 

//         res.end("1") 

//     } 

//     else{ 

//         res.end("0") 

//     } 

// } else if (req.url === path.normalize('/api/sensor/autoon')){ 

//      if (cycle == false){ 

//         startCycle(); 

//         res.end("1") 

//     } 

//     else{ 

//         res.end("0") 

//     } 

 

 

//} 
else if ((req.url.indexOf('?') > -1))
{ 

       

      var outpost = "BAD"; 

      var sarr = req.url.split('?'); 

      if(sarr[0] == path.normalize('/api/sensor/postToken')) 

      { 

          var sarr2 = sarr[1].split('='); 

          if(sarr2[0]=='atoken') 

          { 

              if(sarr2[1].length == 4) 

              { 

                authtoken = sarr2[1]; 

                outpost= "OK"; 

              } 

          } 

      } 

      res.end(outpost); 

       

}  

else if (req.url === path.normalize('/api/sensor/resetToken'))
{
    authtoken = "-1"; 
    console.log("OK");
    res.end();
}

else if (req.url === path.normalize('/api/sensor/json'))
{
    if(authtoken=="-1")
    { 
    
        console.log("authtoken: " + authtoken + "\ntempID = sensor_davun" + "\ntemp: " + rawtemp + "\nstatus: " + status + "\nusername: " + authuname + "\npassword: " + authpword);
    
    } 
    
    else 
    { 
        console.log("authtoken: " + authtoken + "\ntempID = sensor_davun" + "\ntemp: " + rawtemp + "\nstatus: " + status);

    } 
    res.end();
}

 
else { 

 

/* Page not found */ 

res.writeHead(404, { 'Content-Type': 'text/plain' }); 

res.end("this page doesn't exist"); 

 

} 

}); 

 

/* Start the http server. Non-blocking. */ 

server.listen(PORT,HOST); 

console.log("server listening..."); 
