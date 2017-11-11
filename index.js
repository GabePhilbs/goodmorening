

//make sure script is running

console.log("goodmorening running");


//user defined variables

var alarmHour = 2;
var alarmminutes = 34;
var alarmOn = true;







//check if date variables are being retrieved
//console.log(currentHour);
//console.log(currentMinutes);
function runAlarm(h,m){

	while (alarmOn == true) {

		//get date
		var date = new Date();

		//set var for minutes and for hours
		var currentHour = date.getHours();
		var currentMinutes = date.getMinutes();



		if(currentHour == h && currentMinutes == m){
			console.log("ring ring ring");
			alarmOn = false;
		}
	};

};




runAlarm(alarmHour, alarmminutes);








