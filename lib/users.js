Meteor.methods({
	'logCompletedRoutine' : function (routineId) {
		var currentUser = Meteor.userId();

		if(!currentUser) {
			throw new Meteor.error('not-logged-in', 'You\'re not logged in.');
		} 
		Meteor.users.update({_id: currentUser}, {$addToSet: {routinesCompletedToday: routineId}});
	},
	'clearCompletedRoutines' : function () {
		var currentUser = Meteor.userId();
		if(!currentUser) {
			throw new Meteor.error('not-logged-in', 'You\'re not logged in.');
		} 
		Meteor.users.update({_id: currentUser}, {$set : {routinesCompletedToday: []}});
	},
	'updateReminders' : function(remindersBoolean) {
		var currentUser = Meteor.userId();
		if(!currentUser) {
			throw new Meteor.error('not-logged-in', 'You\'re not logged in.');
		} 

		Meteor.users.update({_id: currentUser}, {$set : {remindersOn: remindersBoolean}});
	}
});