

Template.reminders.events({
	'click .close-reminders' : function(event) {
		event.preventDefault();
		$('.reminders-container').removeClass('show');
		setTimeout(function() {
		Session.set('settingReminders', false);
		}, 500);
	},

  	'click .reminders-on' : function(e) {
  		e.preventDefault();
  		Meteor.call('updateReminders', true);
  	},
  	'click .reminders-off' : function(e) {
  		e.preventDefault();
  		Meteor.call('updateReminders', false);
  	}
});

Template.reminders.helpers({
	remindersOn : function() {
		return Meteor.user().remindersOn;
	}
});

Template.reminders.onRendered( function() {
	setTimeout(function() {
      $('.reminders-container').addClass('show');
    }, 50);
});

