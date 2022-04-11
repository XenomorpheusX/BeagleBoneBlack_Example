/* Send temp data from BBB through a connected Socket - Dora Avun */

var net = require('net');
var b = require('bonescript');  //include bonescript 

var HOST = '192.168.137.1';
var PORT = 30000;

var temp_send = 0;

b.pinMode('P8_08',b.OUTPUT); //set  

b.pinMode('P8_10',b.OUTPUT); 

b.digitalWrite('P8_08', b.LOW); 

b.digitalWrite('P8_10',b.LOW); 




  function sendData()
  {
     function readTemp() 
     { 
  
      b.analogRead('P9_40', displayTemp); 
  
     } 
  
  function displayTemp(reading) 
  { 
  
      var millivolts = reading.value * 1800; 
  
      var tempC = (millivolts - 500) / 10; 
  
      var tempF = (tempC * 9/5) + 32; 
      
      temp_send = tempF;
  
      console.log("Temp C=" + tempC + "   Temp F=" + tempF); 
  
       
  
      if(tempC>=26)
      { 
  
          b.digitalWrite('P8_08', b.LOW); 
  
          b.digitalWrite('P8_10',b.LOW); 
  
          console.log("  Cooling..."); 
  
      } 
  
      else
      { 
  
          b.digitalWrite('P8_08', b.HIGH); 
  
          b.digitalWrite('P8_10',b.HIGH); 
  
          console.log("  Heating..."); 
  
      } 

  } 
  
  var client = new net.Socket();
  client.connect(PORT, HOST, function() 
  {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  client.write(temp_send.toString());
  
  });
  


  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client


 
// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
  console.log('DATA: ' + data);

  // Close the client socket completely
  client.destroy();
});


// Add a 'close' event handler for the client socket
client.on('close', function() {
  console.log('Connection closed');
});

readTemp();
}
setInterval(sendData,100); 
// var net = require('net'); 

// var b = require('bonescript');  //include bonescript 

 


 

// var HOST = '192.168.137.1';
// var PORT = 30000;
 

// var x=0; 

// function sendData(){ 

//     function readTemp() { 

//     b.analogRead('P9_40', displayTemp); 

// } 

 

 

// function displayTemp(reading) { 

//     var millivolts = reading.value * 1800; 

//     var tempC = (millivolts - 500) / 10; 

//     var tempF = (tempC * 9/5) + 32; 

//     x=tempF; 

//     console.log("Temp C=" + tempC + "   Temp F=" + tempF); 

     

//     if(tempC>=26){ 

//         b.digitalWrite('P8_08', b.LOW); 

//         b.digitalWrite('P8_10',b.LOW); 

//         console.log("  Cooling..."); 

//     } 

//     else{ 

//         b.digitalWrite('P8_08', b.HIGH); 

//         b.digitalWrite('P8_10',b.HIGH); 

//         console.log("  Heating..."); 

//     } 

// } 

 

// var client = new net.Socket(); 

// client.connect(PORT, HOST, function() { 

//   console.log('CONNECTED TO: ' + HOST + ':' + PORT); 

//   // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 

// client.write(x.toString()); 

 

// }); 

 

// // Add a 'data' event handler for the client socket 

// // data is what the server sent to this socket 

// client.on('data', function(data) { 

//   console.log('DATA: ' + data); 

//   // Close the client socket completely 

//   //client.destroy(); 

// }); 

 

// // Add a 'close' event handler for the client socket 

// client.on('close', function() { 

//   console.log('Connection closed'); 

// }); 

// readTemp(); 

// } 

// setInterval(sendData,100) 

 