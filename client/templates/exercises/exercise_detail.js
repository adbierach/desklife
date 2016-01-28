
Template.exerciseDetail.helpers({
	exercise: function () {
		return Session.get('selectedExercise');
	}
});

Template.exerciseDetail.events({
	'click .back-button-container': function() {
		Session.set('viewingExercise', false);
	}
});
