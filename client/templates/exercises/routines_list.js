Template.routinesList.helpers({
    // settingReminders: function() {
    //   return Session.get('settingReminders');
    // },
    // viewingPrinciples: function() {
    //   return Session.get('viewingPrinciples');
    // },
    viewingAbout: function() {
      return Session.get('viewingAbout');
    },
    templateGestures: {
      'swiperight .routines-container' :function() {
        var $routinesContainer = $('.routines-container');
        if ($routinesContainer.hasClass('opened')) {
          $routinesContainer.removeClass('opened');
        } else {
          $routinesContainer.addClass('opened');    
        }
        console.log('swipe');
      },
      'swipeleft .opened': function() {
        $('.routines-container').removeClass('opened');
      }
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
      var numRoutinesCompletedToday = JSON.parse(localStorage.getItem('completedRoutines')).length;


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
    },

    completedRoutines: function() {
        var routinesCompletedToday;
        var mostRecentDate = JSON.parse(localStorage.getItem('mostRecentDate'));
        //1 - 31 based on day of month
        var today = moment().date();
        //if it is new day, recent completed routines
        if(today !== mostRecentDate) {
          //set completed routines to empty array
          localStorage.setItem('completedRoutines', '[]');
          //returning 0 because we know length of array is 0
          return 0;
        } else {
          routinesCompletedToday = JSON.parse(localStorage.getItem('completedRoutines'));
          return routinesCompletedToday.length;
        }
    },
    routinesCount: function() {
        return Routines.find({}).fetch().length;
    },
    viewingInfo: function() {
      return Session.get('viewingInfo');
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


    },
    'click .start-btn': function() {
      var routines = Routines.find({}, {sort: {id : 1}}).fetch();
      var routinesCompletedToday = JSON.parse(localStorage.getItem('completedRoutines'));//Meteor.user().routinesCompletedToday;
      var pauseId = routines[0]._id;

      for (var i=0; i < routines.length; i++) {
        if (routinesCompletedToday.indexOf(routines[i]._id) < 0) {
          pauseId = routines[i]._id;
        }
      }
      $('.dashboard-container').hide();
      $('.routines-container').addClass('fade-out');
      setTimeout(function() {
        Router.go('/sequence/' + pauseId);
      }, 1000)
      
    },
    'click .desklife-info': function() {
      Session.set('viewingInfo', true);
    }
});

Template.desklifeInfo.onRendered( function () {
  setTimeout(function() {
      $('.info-container').addClass('show');
  }, 50);
});


Template.desklifeInfo.events({
  'click .close-wrapper': function() {
    //resume timer
    $('.info-container').removeClass('show');
    setTimeout(function() {
    Session.set('viewingInfo', false);
    }, 500);
  }
});
