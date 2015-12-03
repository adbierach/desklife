Meteor.startup(function() {

if (Meteor.isCordova) {

cordova.plugins.notification.local.registerPermission(function (granted) {
});



var now             = new Date().getTime(),
    _15_sec_from_now = new Date(now + 15*1000);


cordova.plugins.notification.local.schedule({
    text: "Delayed Notification",
    firstAt: _15_sec_from_now,
    sound: null,
    every: minute
});

cordova.plugins.notification.local.on("schedule", function(notification) {
    alert("scheduled: " + notification.id);
});

cordova.plugins.notification.local.on("trigger", function(notification) {
    alert("triggered: " + notification.id);
});
}

});
