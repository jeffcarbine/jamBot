// Creating the global variables needed
// for the metronome
var bpm = 60;
var bpb = 4;
var emphasis = 1;
i = 0;

// This function starts the metronome
function initLoop()
{
	validate();
	
	if(validate == false) {
		return false	
	} else {

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
		
		// Check the bpm, bpb and emphasis
		// to make sure they are all valid
		var emphasis = document.getElementById('emphasis').value;
	
		// Start the metronome - uses 
		// function startLoop() below	
		console.log(bpb);
		metronome = setInterval('startLoop()', (60000/bpm));
	}
	
}

function validate() {
	
	// Get the metronome number from the drop-down
	// menu selection
	var bpmString = document.getElementById('bpm').value;
	var bpbString = document.getElementById('bpb').value;
	
	// Change the metronome string to number
	var bpm = parseInt(bpmString);
	var bpb = parseInt(bpbString);
	
	var emphasis = document.getElementById('emphasis').value;
	
	if(emphasis > bpb) {
		alert('Emphasized beat must be within beats per measure');
		var validate = false;
	} else {
		var validate = true;
	}
}

// This tells the metronome what
// to do on each marked or non-marked beat
function checkBeat() {
	var emphasis = document.getElementById('emphasis').value;
	
	if (i == (emphasis - 1)) {
		document.getElementById('cajonAccent-1').play();
	} else {
		document.getElementById('cajonNon-1').play();
	}
}	

// This loops through the metronome, restarting
// after the beats reach the end of the measure
function startLoop() {
	// i is the number of beats per bar
	// remember!! it starts with zero, so it is always
	// one less than the beats per measure
	
	// Get the metronome number from the drop-down
	// menu selection
	var bpmString = document.getElementById('bpm').value;
	var bpbString = document.getElementById('bpb').value;
	
	// Change the metronome string to number
	var bpm = parseInt(bpmString);
	var bpb = parseInt(bpbString);
	
	console.log(bpb);

	if(i <= (bpb - 1)) {
		document.getElementById('theCount').innerHTML = (i+1);
		checkBeat();
		i++;	
	} else {
		i = 0;
		document.getElementById('theCount').innerHTML = (i+1);
		checkBeat();
		i++;
	}

}

// This starts the metronome loop
function stopLoop() {
	clearInterval(metronome);
	i = 0;	
	document.getElementById('theCount').innerHTML = '';
}

// Swtich for turning the metronome on or off
function startJam() {
	if (document.getElementById('myonoffswitch').checked == true) {
		initLoop();	
	} else {
		stopLoop();
	}
}

// PANEL/TRIGGER CODE

var panelDisplay = function() 
{ 
	// Using the 'this' keyword
	var self = this; 
	
	this.setup = function() 
	{ 
		// run the addClicks function
		self.addClicks(); 
		
	}; 
	
	// add event listeners
	this.addEvents = function() 
	{ 
		try{ 
			window.addEventListener('load', self.setup, false); 
		} 
		catch(e) 
		{  
			window.attachEvent('load', self.setup, false); 
		} 
	}; 
	
	this.addClicks = function() 
	{ 
		// Define the base id of the switch here
		// that is followed by the numer
		//	for example, "swtich1" "switch2" etc...
		var switchClass = 'trigger';
		// Break apart the switch id to
		// isolate the number
		var switchOptions = document.querySelectorAll('[id*="' + switchClass + '"]'); 
		
		if(typeof switchOptions == 'object') 
		{ 
			// Run a for loop so we can get all
			// of the switches on the page
			for(var i = 0; i < switchOptions.length; i++) 
			{ 
				// define 'option'
				var option = switchOptions[i]; 
				// run the filterText function to get the number only
				var optionNumber = self.filterText(option.id, switchClass); 
				
				// now create the ClickHandler
				option.onclick = self.createClickHandler(optionNumber);
			}
		
		} 
	} 
	
	// Create the ClickHandler function
	this.createClickHandler = function(number)
	{ 
		return function() 
		{ 
			self.displayPanel(number) 
		}; 
	}; 
	
	// This function scrubs all of the switch or
	// panel's id except for it's number, so that
	// they can be matched
	this.filterText = function(text, className) 
	{ 
		// Delete anything that isn't the
		// number at the end of the id
		text = text.replace(className, ''); 
		
		return text; 
	}; 
	
	// This function turns the panels off and on
	this.displayPanel = function(switchOptionNumber) 
	{ 
		// Define the panel id with the
		// same process as before
		var panelClass = 'panel'; 
		var panelOptions = document.querySelectorAll('[id*="' + panelClass + '"]'); 
		
		if(typeof panelOptions == 'object') 
		{ 
			// Once again, loop through the page to isolate
			// the panels
			for(var i = 0; i < panelOptions.length; i++) 
			{ 
				var option = panelOptions[i]; 
				var optionNumber = self.filterText(option.id, panelClass);
				
				// Now, if the switch number equals the
				// panel number:
				if(switchOptionNumber == optionNumber) 
				{ 
					// turn it on!
					option.style.display = 'block'; 
				} 
				else 
				{ 
					// turn it off
					option.style.display = 'none'; 
				}
			}
		
		}
	
	}; 

}; 

var panels = new panelDisplay(); 
// setup the panels on window load
panels.addEvents(); 