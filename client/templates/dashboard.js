Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .clear-routines': function(event) {
    	event.preventDefault();
    	Meteor.call('clearCompletedRoutines');
    }
});