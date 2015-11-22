Meteor.startup(function() {

if (Meteor.isCordova) {

	// cordova.plugins.notification.local.schedule({
	//     id: 1,
	//     text: "Single Notification",
	//     sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
	//     data: { secret:key }
	// });
}

});
