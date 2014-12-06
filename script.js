// Creating the global variables needed
// for the metronome
var bpm = 120;
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

function playAccent() {
	if(document.getElementById('selectInstrument').value == 'Drums') {
		document.getElementById('drumAccent').play();	
	} else {
		document.getElementById('cajonAccent').play();
	}
}

function playNon() {
	if(document.getElementById('selectInstrument').value == 'Drums') {
		document.getElementById('drumNon').play();	
	} else {
		document.getElementById('cajonNon').play();
	}
}

// This tells the metronome what
// to do on each marked or non-marked beat
function checkBeat() {
	var emphasis = document.getElementById('emphasis').value;
	
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

function tuneHeadstock() {
	if (document.getElementById('instrumentHeadstock').checked == 'guitar') {
		document.getElemenetById('guitarHeadstock').style.display == 'block';	
	}
}


// PANEL/SWITCH CODE

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