// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

// This code was taken from the public example given in class, linked here:
// https://github.com/comp426-2023-spring/schedule/blob/main/24-wrapup.md#notes

// This function shows and hides the shot selection in the interface based
// on whether or not the #opponent checkbox is checked
function showHideShots() {
// Get the info from the checkbox
  	let check = document.getElementById('opponent');
// Check if the checkbox is checked and show or hide options accordingly
	if (check.checked == true) {
		$('.shots.rps').show()
		if($('input[type=radio][name=game]:checked').val() === "rpsls"){
			$('.shots.rpsls').show()
		}
		else{
			$('.shots.rpsls').hide()
			let shot = $('input[type=radio][name=shot]:checked').val();
			if(shot === 'spock' || shot === 'lizard') {
				document.getElementById("rock").checked = true;
			}
		}
	} else {
		$('.shots').hide()
	}
}
// This function clears the input form and also resets the shot selection
// radio buttons.
function startOver () {
	document.getElementById('userinput').reset();
	showHideShots();
	$('#res_value').text("")
}

async function playGame () {
	// Get which game is being played based on the value in the form
	let game = $('input[type=radio][name=game]:checked').val();
	// Get which shot is being played based on the value in the form
	let shot = $('input[type=radio][name=shot]:checked').val();
	// Identify the base URL based on browser information
	let baseurl = window.location.href + 'app/'
	// Log the base URL
	console.log(baseurl)
	let url = baseurl + game + '/play/'
	let opponent = $('input[type=checkbox][name=playtype]').is(':checked')
	console.log(opponent)
	if(opponent){
		url = url + shot
	}
    	// Log the full URL
	console.log(url)

	let response = await fetch(url)
	let result = await response.json()
	// Log the result
	console.log(result)
	// Here you should include code that uses the DOM API or jQuery to
	// manipulate another block of HTML in the interface to display the
	// results in some way.
	
	res_text = 'Player rolled ' + result['player']
	if(opponent){
		res_text = res_text + ' and opponent rolled ' + result['opponent'] + '. Result: ' + result['result']
	}
	$('#res_value').text(res_text)
}
