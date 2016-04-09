Meteor.startup(function() {

	if (!localStorage.getItem('completedRoutines')) {
		//initialize completedRoutines as empty array
		localStorage.setItem('completedRoutines', JSON.stringify([]));
	}

	if (!localStorage.getItem('mostRecentDate')) {
		var today = moment().date();
    	localStorage.setItem('mostRecentDate', today);
	}

	if (!localStorage.getItem('remindersOn')) {
		//default to reminders being off
    	localStorage.setItem('remindersOn', false);
	}

});