// JavaScript Document

function check() {
	var button = document.getElementById('button');
	var one = document.getElementById('one').value;
	var two = document.getElementById('two').value;
	
	if ((one == 1) && (two == 2)){
		button.onClick = alert("correct");	
		} else {
		button.onClick = alert("incorrect");
	}
}