Meteor.publish('routines', function() {
	return Routines.find();
});

Meteor.publish('userData', function() {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId},{fields: {'routinesCompletedToday': 1}});
	} else {
		this.ready();
	}
});