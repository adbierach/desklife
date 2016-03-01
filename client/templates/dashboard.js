Template.dashboard.events({
    'click .clear-routines': function(event) {
    	event.preventDefault();
    	Meteor.call('clearCompletedRoutines');
    },

    'click .reminders': function(event) {
    	event.preventDefault();

    	Session.set('settingReminders', true);
    }
});