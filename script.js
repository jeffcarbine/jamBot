// JavaScript Document

var button = document.getElementById('button');

startJam = function()
{
	console.log('startJam started');
	
	var timeSignatures = document.getElementById('timeSignatures');
	var bpm = document.getElementById('bpm');
	console.log('1');
	console.log(timeSignatures);
	console.log(bpm);
	console.log('2');
	
	if((timeSignatures == '2/2') && (bpm == '100')) 
	{
		console.log('I am working!');	
	}
}
		
button.onClick = startJam();