// JavaScript Document

var frequencyString = 0;
var frequencyParsed = 0;

function runLoop()
{
	if(frequencyParsed > 0) clearInterval(frequencyParsed);	
	console.log(frequencyParsed);
	
	var frequencyString = document.getElementById('frequencyString').value;
	console.log('frequencyString is ' + frequencyString);
	
	var frequencyParsed = parseInt(frequencyString);
	console.log(frequencyParsed);
	
	metronome = setInterval('startLoop()', frequencyParsed);	
	
	console.log(frequencyParsed);
}

function startLoop() {
	console.log('Loop has initiated');
}

function stopLoop() {
	clearInterval(metronome);	
}