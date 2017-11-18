



//make sure script is running

console.log("goodmorening running");



//led variables
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var greenLED = new Gpio(15, 'out'); //use GPIO pin 4, and specify that it is output
var blueLED = new Gpio(23, 'out'); //use GPIO pin 4, and specify that it is output

//turns blue led on, this will stay on to indicate that the script is running
if (blueLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    blueLED.writeSync(1);
	}


//user defined variables
var alarmHour = 18;
var alarmminutes = 56;
var alarmOn = true;


function turnAlarmOff(){
	alarmOn = false;
	//turn on green led off
	if (greenLED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
    greenLED.writeSync(0);
	};
};

function ringAlarm(){
	console.log("ring ring ring");
	turnAlarmOff();
	;
}




//check if date variables are being retrieved
//console.log(currentHour);
//console.log(currentMinutes);
function runAlarm(h,m){

	//turn on green led on
	if (greenLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    greenLED.writeSync(1);
	}

	while (alarmOn == true) {

		//get date
		var date = new Date();

		//set var for minutes and for hours
		var currentHour = date.getHours();
		var currentMinutes = date.getMinutes();



		if(currentHour == h && currentMinutes == m){
			
			ringAlarm();
		}
	};

};




runAlarm(alarmHour, alarmminutes);

function blueLEDOff(){
	//turn blue led off when script is done
	if (blueLED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
	    blueLED.writeSync(0);
		}

};

setTimeout(blueLEDOff, 5000);




