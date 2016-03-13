Template.dashboard.events({
    'click .reminders': function(event) {
    	event.preventDefault();

    	Session.set('settingReminders', true);
    }
});