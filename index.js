



// ********* ********* ********* STARTING OUT************* ********* ********* 

//make sure script is running

console.log("goodmorening running");


//GPIO variables
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var greenLED = new Gpio(14, 'out'); //use GPIO pin 14, and specify that it is output
var blueLED = new Gpio(15, 'out'); //use GPIO pin 15, and specify that it is output
var powerSwitch = new Gpio(20, 'out'); //use GPIO pin 21, and specify that it is output, controlls iotRelay




//global variables
var alarmOn = false;


//first turn of blue in case it was on, to indicate the script is restarting
if (blueLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    blueLED.writeSync(1);
	}

//turns blue led on, this will stay on to indicate that the script is running
if (blueLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    blueLED.writeSync(1);
	}



//resets green light
if (greenLED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
    greenLED.writeSync(0);
	};













// ********* ********* ********* ALARM FUNCTIONS ************* ********* ********* 



// function for getting user input
function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}






function turnAlarmOff(){
	alarmOn = false;
	//turn on green led off
	if (greenLED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
    greenLED.writeSync(0);
	};
};

function ringAlarm(){

	console.log("ring ring ring");
	openBlinds();
	makeCoffee();
	playSong();

	turnAlarmOff();
	
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






//function to get user data
function askUser(){

	prompt('Set alarm hour (0-24)', function (input) {
	    alarmHour = input;
	    process.exit();
	});

	prompt('Set alarm minutes (1-60)', function (input) {
	    alarmMinutes = input;
	    process.exit();
	});
	alarmOn = true;

}







// ********* ********* ********* HARDWARE FUNCTIONS  ************* ********* ********* 

function blueLEDOff(){
	//turn blue led off when script is done
	if (blueLED.readSync() === 1) { //check the pin state, if the state is 0 (or off)
	    blueLED.writeSync(0);
		}

};



//functions for iotRelay
function powerSwitchOn(){
	if (powerSwitch.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    powerSwitch.writeSync(1);
	}
}

function powerSwitchOff(){
	if (powerSwitch.readSync() === 1) { 
    powerSwitch.writeSync(0);
	}
}

//Function for closing blinds 
function closeBlinds() {

};

//Function for opening blinds
function openBlinds() {

};

//Function for making coffee
function makeCoffee() {
	powerSwitchOn();
	setTimeout(powerSwitchOff, 600000);
	

};

//Function for playing song
function playSong() {

};






// ********* ********* ********* MAIN FUNCTION  ************* ********* ********* 


//the function that brings everything together
function mainFunction(){


	//function variables
	var end = false;
	var alarmHour = 22;
	var alarmMinutes = 51;
	var validInput =false;



	//get user input and test if values are int(inplement later) and make sense

	while (validInput == false){

		askUser();

		if(alarmHour >=0 && alarmHour<=24 && alarmMinutes >=0 &&  alarmMinutes <=60 ){
			validInput =true;

			//display message saying the alarm is on
			console.log("The alarm is set for " + alarmHour + ":" + alarmMinutes);

		} else {console.log("Invalid input")}
	}



	//loop to have recurring alarm - NOT YET IMPLEMENTED
	while(end ==false){




		runAlarm(alarmHour, alarmMinutes);


		//will create a logical test to decide if the alarm will play again based on week days or something
		end = true;


	}



};



// ********* ********* ********* RUN SCRIPT ************* ********* ********* 


mainFunction();



setTimeout(blueLEDOff, 5000);




