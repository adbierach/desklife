Template.dashboard.events({
    'click .clear-routines': function(event) {
    	event.preventDefault();
    	localStorage.setItem('completedRoutines', '[]');
    },

    'click .reminders': function(event) {
    	event.preventDefault();

    	Session.set('settingReminders', true);
    }
});