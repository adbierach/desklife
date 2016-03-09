

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
  		if (Meteor.isCordova) {

	  		var reminderTimesArray = reminder.buildReminderTimesArray();
	  		reminder.setReminders(reminderTimesArray);
	
	  		//Meteor.call('updateReminders', false);

	  	}
  	},
  	'click .reminders-off' : function(e) {
  		e.preventDefault();
  		Meteor.call('updateReminders', false);
  		if (Meteor.isCordova) {
  			reminder.cancelAllReminders();
  		}
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




var reminder = {
	setReminders : function(reminderTimesArray) {
		var remindersDateArray = this.buildRemindersDateArray(reminderTimesArray);
		var remindersArray = this.buildRemindersArray(remindersDateArray);
		this.scheduleReminders(remindersArray);
	},

	requestReminderPermission: function () {
		cordova.plugins.notification.local.registerPermission(function (granted) {
		});
	},
	buildReminderTimesArray: function (numberOfReminders) {
		//stubbed data for now
		//list of what times user will get a reminder
		var reminderTimesArray = [
			{
				hour: 10,
				minute: 0
			},
			{
				hour: 11,
				minute: 30
			},
			{
				hour: 12,
				minute: 30
			},
			{
				hour: 14,
				minute: 0
			},
			{
				hour: 15,
				minute: 30
			},
			{
				hour: 17,
				minute: 0
			}
		];

		return reminderTimesArray;
	},

	buildRemindersDateArray : function (reminderTimesArray) {
		//takes an array of hour,minute keyed objects and builds an
		//array of date objects from them
		var remindersDateArray = [];

		var now = moment(),
		date = now.date(),
		year = now.year(),
		month = now.month();

		//builds an array of date objects for each reminder time
		reminderTimesArray.forEach(function(time) {
			var reminder = moment({
				y: year, 
				M: month, 
				d: date, 
				h: time.hour, 
				m: time.minute 
			});

			//if reminder has already happened for this day, change
			//the day to tomorrow
			if (now > reminder) {
				reminder.add('1', 'days');
			}

			//converts to date object
			reminder = reminder.toDate();

			remindersDateArray.push(reminder);
		});


		return remindersDateArray;
	},

	buildRemindersArray: function (remindersDateArray) {
		//takes array of date objects and returns an array
		//of reminder objects, which are used to schedule reminders
		var remindersArray = [], reminder;


		
		remindersDateArray.forEach(function (date, index) {
			reminder = {
				id: index + 1,
				title: 'Hey there,',
				text: 'Time to take a break?',
				at: date,
				every: 'day'
			}

			remindersArray.push(reminder);
		});

		return remindersArray;

	},
	scheduleReminders: function(remindersArray) {
		//takes an array of reminder objects to schedule notifs
		cordova.plugins.notification.local.schedule(remindersArray);
	},

	cancelAllReminders: function () {
		cordova.plugins.notification.local.cancelAll();
	}


};



// cordova.plugins.notification.local.on("schedule", function(notification) {
//     alert("scheduled: " + notification.id);
// });

// cordova.plugins.notification.local.on("trigger", function(notification) {
//     alert("triggered: " + notification.id);
// });



			
