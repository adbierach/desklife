Router.route('/register');

Router.route('/login');

Router.route('/', {
	template: 'routinesList'
});


Router.route('/routine/:_id', {
	template: 'routineDetail',
	data: function() {
		var selectedRoutine = this.params._id;
		return Routines.findOne({_id: selectedRoutine});
	}
});

Router.route('/sequence/:_id', {
	template: 'routineSequence',
	data: function() {
		var activeRoutineId = this.params._id;
		var activeRoutine = Routines.findOne({_id: activeRoutineId});
		Session.set('activeRoutine', activeRoutine);
		return activeRoutine;
	}
})

Router.configure({
	layoutTemplate: 'main'
});