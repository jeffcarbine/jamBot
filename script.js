// Creating the two variables needed
// for the metronome to be decoded
var bpmString = 0;
var bpm = 60;
var bpb = 4;
i = 0;

// This function starts the metronome
function initLoop()
{
	// Clear metronome when restarting
	if(bpm > 0) clearInterval(bpm);	
	if(bpb > 0) clearInterval(bpb);
	
	// Get the metronome number from the drop-down
	// menu selection
	var bpmString = document.getElementById('bpm').value;
	var bpbString = document.getElementById('bpb').value;
	
	// Change the metronome string to number
	var bpm = parseInt(bpmString);
	var bpb = parseInt(bpbString);
	
	// Start the metronome - uses 
	// function startLoop() below	
	metronome = setInterval('startLoop()', (60000/bpm));

}

// This tells the metronome what
// to do on each marked or non-marked beat
function checkBeat() {
	if (i == 0) {
		console.log('Marked beat');
	} else {
		console.log('Non-marked beat');	
	}
}	

// This loops through the metronome, restarting
// after the beats reach the end of the measure
function startLoop() {
	// i is the number of beats per measure
	// remember!! it starts with zero, so it is always
	// one less than the beats per measure
	if(i <= (bpb - 1)) {
		console.log(i)
		checkBeat();
		i++;	
	} else {
		i = 0;
		console.log(i);
		checkBeat();
		i++;
	}

}

// This starts the metronome loop
function stopLoop() {
	clearInterval(metronome);	
}