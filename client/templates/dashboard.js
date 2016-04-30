Template.dashboard.events({
    // 'click .reminders': function(event) {
    // 	event.preventDefault();

    // 	Session.set('settingReminders', true);
    // },
    // 'click .principles-section': function(event) {
    // 	event.preventDefault();

    // 	Session.set('viewingPrinciples', true);
    // },
    'click .about-section': function(event) {
    	event.preventDefault();

    	Session.set('viewingAbout', true);
    }
});

Template.about.onRendered( function() {
	setTimeout(function() {
      $('.about-container').addClass('show');
    }, 50);
});


Template.about.events({
	'click .close-about' : function(event) {
		event.preventDefault();
		$('.about-container').removeClass('show');
		setTimeout(function() {
		Session.set('viewingAbout', false);
		}, 500);
	}
});

// Template.principles.onRendered( function() {
// 	setTimeout(function() {
//       $('.principles-container').addClass('show');
//     }, 50);
// });


// Template.principles.events({
// 	'click .close-principles' : function(event) {
// 		event.preventDefault();
// 		$('.principles-container').removeClass('show');
// 		setTimeout(function() {
// 		Session.set('viewingPrinciples', false);
// 		}, 500);
// 	}
// });