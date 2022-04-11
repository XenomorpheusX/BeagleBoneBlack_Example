// Output heat reading and turn on/off heat source accordingly.
// - Dora Avun


var b = require('bonescript');  //include bonescript 

 

b.pinMode('P8_08',b.OUTPUT); //set  

b.pinMode('P8_10',b.OUTPUT); 

b.digitalWrite('P8_08', b.HIGH); 

b.digitalWrite('P8_10',b.HIGH); 


// function readTemp() { 

//     b.analogRead('P9_40', displayTemp); 

// } 

 

 

// function displayTemp(reading) 
// { 

//     var millivolts = reading.value * 1800; 

//     var tempC = (millivolts - 500) / 10; 

//     var tempF = (tempC * 9/5) + 32; 

//     console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

     

//     if(tempC>=2)
//     { 

//         b.digitalWrite('P8_08', b.LOW); 

//         b.digitalWrite('P8_10',b.LOW); 

//         console.log("  Cooling..."); 

//     } 

//     else
//     { 

//         b.digitalWrite('P8_08', b.HIGH); 

//         b.digitalWrite('P8_10',b.HIGH); 

//         console.log("  Heating..."); 

//     } 

// } 

 

// setInterval(readTemp, 10000); 