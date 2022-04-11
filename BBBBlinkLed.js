//Blinks LED's on BBB in an interval - Dora Avun

var b = require('bonescript');  //include bonescript
var state = 0;
const leds = ["USR0", "USR1", "USR2", "USR3"]; //set constants for 4 leds

for(var i in leds) //set all led pinModes as output
{
    b.pinMode(leds[i], b.OUTPUT);
}

for(var i in leds) //write 0 to all leds (turn them off)
{
    b.digitalWrite(leds[i], b.LOW);
}

function toggleLED() //function that toggles the led
{
    state = state ? 0 : 1; //two states that change each time the function runs
    b.digitalWrite(leds[0], state); //write the state into USR0 LED
};

var timer = setInterval(toggleLED, 1000); //the timer variable is set as an interval between
                                          //0 and 1000ms

function stopTimer() //stops the timer when it has toggled 10 times (10000ms)
{
    clearInterval(timer); //reset the interval
    b.digitalWrite(leds[0], b.LOW); //write 0 for the led - turn off.
};
setTimeout(stopTimer, 10000);