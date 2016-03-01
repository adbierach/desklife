// Router.route('/register');

// Router.route('/login', {
// 	name: 'login'
// });

Router.route('/', {
	name: 'home',
	template: 'routinesList'
	//onBeforeAction: function(){
		// var currentUser = Meteor.userId();
		// if (currentUser) {
		// 	this.next();
		// } else {
		// 	this.render('login');
		// }
	//}
});


Router.route('/routine/:_id', {
	template: 'routineDetail',
	data: function() {
		var selectedRoutine = this.params._id;
		return Routines.findOne({_id: selectedRoutine});
	}
	// onBeforeAction: function(){
	// 	// var currentUser = Meteor.userId();
	// 	// if (currentUser) {
	// 	// 	this.next();
	// 	// } else {
	// 	// 	this.render('login');
	// 	// }
	// }
});

Router.route('/sequence/:_id', {
	template: 'routineSequence',
	data: function() {
		var activeRoutineId = this.params._id;
		var activeRoutine = Routines.findOne({_id: activeRoutineId});
		Session.set('activeRoutine', activeRoutine);
		return activeRoutine;
	}
	//onBeforeAction: function(){
		// var currentUser = Meteor.userId();
		// if (currentUser) {
		// 	this.next();
		// } else {
		// 	this.render('login');
		// }
	//}
})

Router.configure({
	layoutTemplate: 'main'
});