



//make sure script is running

console.log("goodmorening running");



//led variables
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(23, 'out'); //use GPIO pin 4, and specify that it is output





//user defined variables
var alarmHour = 2;
var alarmminutes = 34;
var alarmOn = true;


function turnAlarmOff(){
	alarmOn = false;
	//turn on green led off
	if (LED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(0);
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
	if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1);
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








