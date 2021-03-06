///////////////////
// METRONOME SCRIPT

// Creating the global variables needed
// for the metronome and giving them
// default values that will be adjusted
// by the user
var bpm = 120;
var bpb = 4;
var emphasis = 1;
i = 0;

// Initializes the loop that
// runs the metronome
function initLoop()
{
	// Validating the bmp, bpb and emphasis
	validate();
	
	// Stop the script if validation fails
	if(validate == false) {
		return false	
	} else {

		// Clear metronome when restarting
		if(bpm > 0) clearInterval(bpm);	
		if(bpb > 0) clearInterval(bpb);
		
		// Get bpm, bpb and emphasis
		var bpm = parseInt(document.getElementById('bpm').value);
		var bpb = parseInt(document.getElementById('bpb').value);
		var emphasis = document.getElementById('emphasis').value;
	
		// Start the metronome - uses 
		// function startLoop() below	
		console.log(bpb);
		metronome = setInterval('startLoop()', (60000/bpm));
	}
	
}

// Validates whether the bpb, bpm and emphasis
// are all valid before running the metronome
function validate() {
	
	// Get bpm, bpb and emphasis
	var bpm = parseInt(document.getElementById('bpm').value);
	var bpb = parseInt(document.getElementById('bpb').value);
	var emphasis = document.getElementById('emphasis').value;
	
	// Alert user if their inputs are invalid
	if(emphasis > bpb) {
		alert('Emphasized beat must be within beats per measure');
		var validate = false;
	} else {
		var validate = true;
	}
}

// Plays the sound for the accented beat
function playAccent() {
	
	var accentSound = document.getElementById('selectInstrument').value;
	
	document.getElementById(accentSound + 'Accent').play();	

}

// Plays the sound for the non-accented beat
function playNon() {
	
	var nonSound = document.getElementById('selectInstrument').value;
	
	document.getElementById(nonSound + 'Non').play();
	
}

// This tells the metronome what
// to do on each marked or non-marked beat
function checkBeat() {
	
	// First, get the emphasis
	var emphasis = document.getElementById('emphasis').value;
	
	// Then, if the beat matches the emphasis
	// play the emphasis sound. If not, play the
	// non-emphasis sound
	if (i == (emphasis - 1)) {
		playAccent();
	} else {
		playNon();
	}
}	

// This loops through the metronome, restarting
// after the beats reach the end of the measure
function startLoop() {
	// i is the number of beats per bar
	// remember!! it starts with zero, so it is always
	// one less than the beats per measure
	
	// Get bpm, bpb and emphasis
	var bpm = parseInt(document.getElementById('bpm').value);
	var bpb = parseInt(document.getElementById('bpb').value);

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

// This stops the metronome loop
// and resets the metronome to zero
function stopLoop() {
	clearInterval(metronome);
	i = 0;	
	document.getElementById('theCount').innerHTML = '';
}

// Swtich for turning the metronome on or off
function startJam() {
	// Check if the on/off switch is switched on
	// or if it switched off
	if (document.getElementById('myonoffswitch').checked == true) {
		initLoop();	
	} else {
		stopLoop();
	}
}


// END METRONOME SCRIPT
///////////////////////

//////////////////////
// GUITAR TUNER SCRIPT

function tuneHeadstock() {
	if (document.getElementById('instrumentHeadstock').checked == 'guitar') {
		document.getElemenetById('guitarHeadstock').style.display == 'block';	
	}
}

// END GUITAR TUNER SCRIPT
//////////////////////////

//////////////////////
// PANEL/SWITCH SWITCH



var panelDisplay = function(optionClassName, panelClassName) 
{ 
	this.optionClass = optionClassName; 
	this.panelClass = panelClassName; 
	
	var self = this; 
	
	this.setup = function() 
	{ 
		self.addClicks(); 
		
		/* we want to remove all panels before */ 
		//self.displayPanel(); 
	}; 
	
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
		/* This var tells the script what you have
		the switch id set as */
		var switchClass = self.optionClass;
		/* Now we want to break that switch 
		apart to get the number */ 
		var switchOptions = document.querySelectorAll('[id*="' + switchClass + '"]'); 
		
		if(typeof switchOptions == 'object') 
		{ 
			/* We need to loop through our object to
			get all of the panel numbers */
			for(var i = 0; i < switchOptions.length; i++) 
			{ 
				var option = switchOptions[i]; 
				var optionNumber = self.filterText(option.id, switchClass); 
				
				option.onclick = self.createClickHandler(optionNumber);
			}
		
		} 
	} 
	
	this.createClickHandler = function(number)
	{ 
		return function() 
		{ 
			self.displayPanel(number) 
		}; 
	}; 
	
	this.filterText = function(text, className) 
	{ 
		/* Delte the id and keep only
		the number */
		text = text.replace(className, ''); 
		
		return text; 
	}; 
	
	this.displayPanel = function(switchOptionNumber) 
	{ 
		var panelClass = self.panelClass; 
		var panelOptions = document.querySelectorAll('[id*="' + panelClass + '"]'); 
		
		if(typeof panelOptions == 'object') 
		{ 
			for(var i = 0; i < panelOptions.length; i++) 
			{ 
				var option = panelOptions[i]; 
				var optionNumber = self.filterText(option.id, panelClass);
				
				/* We need to match up the switch number
				and the panel number */
				if(switchOptionNumber == optionNumber) 
				{ 
					/* Turn on the panel! */
					option.style.display = 'block'; 
				} 
				else 
				{ 
					/* Keep the other panels off */
					option.style.display = 'none'; 
				}
			}
		
		}
	
	}; 

};
 
// Deinfe switch and panel classes here
var panels = new panelDisplay('trigger', 'panel'); 
var instruments = new panelDisplay('radio', 'instrument'); 
/* we want to setup the panels on window load */ 
panels.addEvents(); 
instruments.addEvents();

// END PANEL/SWITCH CODE
////////////////////////