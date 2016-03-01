Meteor.startup(function() {

	if (!localStorage.getItem('completedRoutines')) {
		//initialize completedRoutines as empty array
		localStorage.setItem('completedRoutines', JSON.stringify([]));
	}


});