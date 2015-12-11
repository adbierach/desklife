Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .clear-routines': function(event) {
    	event.preventDefault();
    	Meteor.call('clearCompletedRoutines');
    },

    'click .schedule-notifs': function(event) {
    	event.preventDefault();

	    if (Meteor.isCordova) {

	    	cordova.plugins.notification.local.registerPermission(function (granted) {
			});

	    	var tenAM = new Date("December 9, 2015 10:00:00")
	    	var elevenAM = new Date("December 9, 2015 11:00:00")
	    	var twelvePM = new Date("December 9, 2015 12:00:00")
	    	var oneThirtyPM = new Date("December 9, 2015 13:30:00")
	    	var twoThirtyPM = new Date("December 9, 2015 14:30:00")
	    	var fourPM = new Date("December 9, 2015 16:00:00")
	    	var fiveThirtyPM = new Date("December 9, 2015 17:30:00")

	    	var now = new Date().getTime(),
			_15_sec_from_now = new Date(now + 15*1000);


			cordova.plugins.notification.local.on("schedule", function(notification) {
			    alert("scheduled: " + notification.id);
			});

			cordova.plugins.notification.local.on("trigger", function(notification) {
			    alert("triggered: " + notification.id);
			});

			cordova.plugins.notification.local.schedule([{
				id: 1,
				title: "Yo yo",
			    text: "Time for some stretching",
			    at: _15_sec_from_now,
			    sound: null,
			    every: "day"
			},{
				id: 2,
				title: "Yo",
			    text: "Time for some stretching at 10AM",
			    at: tenAM,
			    sound: null,
			    every: "day"
			},{
				id: 3,
				title: "Yo",
			    text: "Time for some stretching at 11AM",
			    at: elevenAM,
			    sound: null,
			    every: "day"
			},{
				id: 4,
				title: "Yo",
			    text: "Time for some stretching at 12PM",
			    at: twelvePM,
			    sound: null,
			    every: "day"
			},{
				id: 5,
				title: "Yo",
			    text: "Time for some stretching at 1:30PM",
			    at: oneThirtyPM,
			    sound: null,
			    every: "day"
			},{
				id: 6,
				title: "Yo",
			    text: "Time for some stretching at 2:30PM",
			    at: twoThirtyPM,
			    sound: null,
			    every: "day"
			},{
				id: 7,
				title: "Yo",
			    text: "Time for some stretching 4PM",
			    at: fourPM,
			    sound: null,
			    every: "day"
			},{
				id: 8,
				title: "Yo",
			    text: "Time for some stretching at 5:30PM",
			    at: fiveThirtyPM,
			    sound: null,
			    every: "day"
			}]);
		}
    }
});