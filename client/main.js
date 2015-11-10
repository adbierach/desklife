
if (Meteor.isClient) {
  Session.setDefault('viewingExercise', false);


  Template.routinesList.helpers({
    routines: function() {

      return Routines.find({});

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

      //var routinesData = Session.get('routinesData');
      var routinesCompleted = 0;

      // routinesData.forEach(function(routine) {
      //     if (routine.completed) {
      //       routinesCompleted++;
      //     }
      // }); 

      switch (routinesCompleted) {
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
  Template.routineDetail.helpers({
    viewingExercise : function () {
      return Session.get('viewingExercise');
    }
 });

  Template.routineDetail.events({
    'click .exercise': function() {

      var selectedExercise = this.name;

      Session.set('selectedExercise', selectedExercise);
      Session.set('viewingExercise', true);

      //ga('send', 'event', selectedExercise, 'list detail viewed');


    },

  });

  Template.exerciseDetail.helpers({
    exercise: function () {

      var selectedExercise = Session.get('selectedExercise');

      return Exercises.findOne({name: selectedExercise});
    }
  });

  Template.exerciseDetail.events({
      'click .back-button-container': function() {
        Session.set('viewingExercise', false);
    }
  });

  Template.exitSequenceModal.events({
    'click .return-to-routine': function() {
      Session.set('exitingSequence', false);
    },

    'click .confirm-exit': function() {
      Session.set('exitingSequence', false);
      Session.set('exerciseSequence', false);
      Session.set('routinesState',true);

      var selectedRoutineId = Session.get('selectedRoutineId');
      var routineNum = 'Routine #' + selectedRoutineId;
      //ga('send', 'event', routineNum, 'abandoned');
    }
  });

  Template.routineSequence.helpers({
    timer: function () {
      var time = Session.get('timer');

      if (time.toString().length === 1) {
        time = '0' + time;
      }

      return time;

    },
    viewingExercise : function () {
      return Session.get('viewingExercise');
    },
    activeExercise: function () {
      var activeExerciseIndex = Session.get('activeExerciseIndex');
      return this.exercises[activeExerciseIndex];
    },

    timerRunning: function () {
      return Session.get('timerRunning');
    },

    exitingSequence: function () {
      return Session.get('exitingSequence');
    },

    totalExercises: function () {
      return this.exercises.length;
    },

    exercisesCompleted: function () {
      var activeExerciseIndex = Session.get('activeExerciseIndex');
      var exercisesCompleted = activeExerciseIndex + 1;
      return exercisesCompleted;
    }

  });

  Template.routineSequence.events({
    'click .pause, click .resume': function() {
      toggleTimer();
    },

    'click .view-exercise': function() {
      
      var selectedExercise = Session.get('activeExercise');
      var timerRunning = Session.get('timerRunning');
      
      if (timerRunning) { 
        toggleTimer();
      }
      Session.set('selectedExercise', selectedExercise);
      Session.set('viewingExercise', true);

      //ga('send', 'event', selectedExercise, 'sequence detail viewed');

    },

    'click .close': function() {
      var timerRunning = Session.get('timerRunning');

      if (timerRunning) { 
        toggleTimer();
      }

      Session.set('exitingSequence', true);
    }


  });
  Template.routineSequence.onCreated(function(){
      startSequence();
  });

  Template.routineSequence.onDestroyed(function(){
      Meteor.clearInterval(interval);
  });

  function startSequence() {
    var initialExerciseIndex = 0,
    activeRoutine = Session.get('activeRoutine'),
    initialExercise = activeRoutine.exercises[initialExerciseIndex];

    timer = initialExercise.duration; 
    interval = Meteor.setInterval(sequenceTimer, 100);
    
    Session.set('timer', timer);
    Session.set('activeExerciseIndex', initialExerciseIndex);
    Session.set('timerRunning', true);
  }

  function sequenceTimer() {
    if (timer > 0) {
      timer--;
      Session.set("timer", timer);
    } else {
      nextExercise();
    }
  };

  function nextExercise(){
    var previousExerciseIndex = Session.get('activeExerciseIndex'),
    upcomingExerciseIndex = previousExerciseIndex + 1;
    activeRoutine = Session.get('activeRoutine'),
    exerciseList = activeRoutine.exercises,
    upcomingExercise = exerciseList[upcomingExerciseIndex];


    if (upcomingExerciseIndex < exerciseList.length) {
      timer = upcomingExercise.duration;
      Session.set('timer', timer);
      Session.set('activeExerciseIndex', upcomingExerciseIndex);
    }
    else {
      completeRoutine(activeRoutine);
    }
  }

  function completeRoutine (routine) {
      Router.go('/');
  }



  function toggleTimer() {
      var timerRunning = Session.get('timerRunning');

      if (timerRunning) { 
        Session.set('timerRunning', false);
        Meteor.clearInterval(interval);

      } else {
        Session.set('timerRunning', true);
        interval = Meteor.setInterval(sequenceTimer, 1000);

      }
  };
  


}







