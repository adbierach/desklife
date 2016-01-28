Template.routinesList.helpers({
    settingReminders: function() {
      return Session.get('settingReminders');
    },
    routines: function() {
      var routines = Routines.find({}).fetch();
      var routinesCompletedToday = Meteor.user().routinesCompletedToday;
      var userRoutines = [];

      routines.forEach(function(routine) {
        var routineId = routine._id;
        var routineCompleted = false;

        for (var i=0; i < routinesCompletedToday.length; i++) {
          if (routinesCompletedToday[i] === routineId) {
            routineCompleted = true;
          }
        }
        routine.completed = routineCompleted;

        userRoutines.push(routine);
      });

      //ensures routines are sorted
      userRoutines.sort(function (a,b) {
        if (a.id < b.id)
          return -1;
        else if (a.id > b.id)
          return 1;
        else 
          return 0;
      });

      return userRoutines;
    },

    routinesMessage: function() {
      var routinesMessages = [
      'Go ahead, get started. Come back about every hour to start the next routine.',
      'Way to go! The journey of a thousand miles begins with the one step. Ready for the next one?',
      'Two down, four to go! ',
      'So, is it half empty or half full?',
      'You\'ve past the point of no return! Take a deep breath and come back in an hour.',
      'This last one is fun.',
      'It is good to have an end to journey toward; but it is the journey that matters, in the end. Congratulations!'
      ];
      var numRoutinesCompletedToday = Meteor.user().routinesCompletedToday.length;


      switch (numRoutinesCompletedToday) {
        case 0:
          routinesMessage = routinesMessages[0];
          break;
        case 1:
          routinesMessage = routinesMessages[1];
          break; 
        case 2:
          routinesMessage = routinesMessages[2];
          break;
        case 3:
          routinesMessage = routinesMessages[3];
          break;
        case 4:
          routinesMessage = routinesMessages[4];
          break;
        case 5:
          routinesMessage = routinesMessages[5];
          break;
        case 6:
          routinesMessage = routinesMessages[6];
          break;
      } 

      return routinesMessage;
    }
});

Template.routinesList.events({
  'click .toggle-dashboard': function(event) {
      var $routinesContainer = $('.routines-container');
      if ($routinesContainer.hasClass('opened')) {
        $routinesContainer.removeClass('opened');
      } else {
        $routinesContainer.addClass('opened');    
      }

     // ga('send', 'event', 'Dashboard', 'opened');


    }
});