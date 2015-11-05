
if (Meteor.isClient) {
  Session.setDefault('routinesState', true);
  Session.setDefault('exercisesState', false);
  Session.setDefault('exerciseState', false);
  Session.setDefault('exerciseSequence', false);
  Session.setDefault('selectedRoutineId', '1');
  Session.setDefault('routinesData', [{id: '1', completed: false}, 
      {id: '2', completed: false},
      {id: '3', completed: false},
      {id: '4', completed: false},
      {id: '5', completed: false},
      {id: '6', completed: false}]);


  Template.body.helpers ({
    routinesState : function () { 
      return Session.get('routinesState');
    },

    exercisesState : function () {
      return Session.get('exercisesState');
    },

    exerciseState : function () {
      return Session.get('exerciseState');
    },

    exerciseSequence : function () {
      return Session.get('exerciseSequence');
    }
  })


  Template.routinesList.helpers({
    routines: function() {
      //return Routines.find({}, {sort: {id: 1}});

      var routinesData = Session.get('routinesData');

      return routinesData;

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

      var routinesData = Session.get('routinesData');
      var routinesCompleted = 0;

      routinesData.forEach(function(routine) {
          if (routine.completed) {
            routinesCompleted++;
          }
      }); 

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
    'click .routine-num': function() {
      console.log(this.id);
      var selectedRoutineId = this.id;

      //Session.set('selectedRoutine', selectedRoutine);
      //note I'm doing the above so that I can update the status 
      //for this routine to completed at the end of the sequence
      //I may not need to store the routine object like this, there
      //might be a better way to update the routines list view

      Session.set('selectedRoutineId', selectedRoutineId);
      Session.set('routinesState', false);
      Session.set('exercisesState', true);

      var routineNum = 'Routine #' + selectedRoutineId;
      ga('send', 'event', routineNum, 'selected');
    },
    'click .toggle-dashboard': function(event) {
        var $routinesContainer = $('.routines-container');
        if ($routinesContainer.hasClass('opened')) {
          $routinesContainer.removeClass('opened');
        } else {
          $routinesContainer.addClass('opened');    
        }

        ga('send', 'event', 'Dashboard', 'opened');


      }
  });

  Template.exercisesList.helpers({
    exercisesList: function () {
      var selectedRoutineId = Session.get('selectedRoutineId');
      return Exercises.find({routines: selectedRoutineId});
    },

    selectedRoutine: function () {
      return Session.get('selectedRoutineId');
    }
  });

  Template.exercisesList.events({
    'click .exercise': function() {

      var selectedExercise = this.name;

      Session.set('selectedExercise', selectedExercise);
      Session.set('exerciseState', true);

      ga('send', 'event', selectedExercise, 'list detail viewed');


    },

    'click .back-button-container': function() {
      Session.set('exercisesState', false);
      Session.set('routinesState', true);
    },
    'click .start-routine': function() {
      Session.set('exercisesState', false);
      Session.set('exerciseSequence', true);

      var selectedRoutineId = Session.get('selectedRoutineId');
      var routineNum = 'Routine #' + selectedRoutineId;
      ga('send', 'event', routineNum, 'started');
    }

  });

  Template.exerciseDetail.helpers({
    exercise: function () {

      var selectedExercise = Session.get('selectedExercise');

      return Exercises.findOne({name: selectedExercise});
    }
  });

  Template.exerciseDetail.events({
      'click .back-button-container': function() {
        Session.set('exerciseState', false);
    }
  });

  Template.activeExercise.helpers({
    timer: function () {
      var time = Session.get('timer');

      if (time.toString().length === 1) {
        time = '0' + time;
      }

      return time;

    },
    activeExercise: function () {
      var activeExercise = Session.get('activeExercise');
      return Exercises.findOne({name: activeExercise});
    },

    timerRunning: function () {
      return Session.get('timerRunning');
    },

    exitSequenceModal: function () {
      return Session.get('exitSequenceModal');
    },

    totalExercises: function () {
      var activeRoutine = Session.get('selectedRoutineId');
      var activeExercises = Exercises.find({routines: activeRoutine}).fetch();
      
      return activeExercises.length;
    },

    exercisesCompleted: function () {
      var exerciseIndex = Session.get('exerciseIndex');

      return exerciseIndex;
    }

  });

  Template.activeExercise.events({
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
      Session.set('exerciseState', true);

      ga('send', 'event', selectedExercise, 'sequence detail viewed');

    },

    'click .close': function() {
      var timerRunning = Session.get('timerRunning');

      if (timerRunning) { 
        toggleTimer();
      }

      Session.set('exitSequenceModal', true);
    },

    'click .confirm-exit': function() {
      Session.set('exitSequenceModal', false);
      Session.set('exerciseSequence', false);
      Session.set('routinesState',true);

      var selectedRoutineId = Session.get('selectedRoutineId');
      var routineNum = 'Routine #' + selectedRoutineId;
      ga('send', 'event', routineNum, 'abandoned');
    },

    'click .return-to-routine': function() {
      Session.set('exitSequenceModal', false);
    }


  });
  Template.activeExercise.onCreated(function(){
       Session.set('exerciseIndex', 0);
       nextExercise();
       interval = Meteor.setInterval(timeLeft, 1000);
       Session.set('timerRunning', true);
       //console.log(this);
            
  });

  Template.activeExercise.onDestroyed(function(){
      Meteor.clearInterval(interval);

   
  });



  function nextExercise(){
    var activeRoutine = Session.get('selectedRoutineId'),
    activeExercises = Exercises.find({routines: activeRoutine}).fetch(),
    exerciseIndex = Session.get('exerciseIndex'),
    activeExercise = activeExercises[exerciseIndex];

    if (exerciseIndex < activeExercises.length) {
      Session.set('activeExercise', activeExercise.name);
      timer = activeExercise.duration;
      exerciseIndex++;
      Session.set('timer', timer);
      Session.set('exerciseIndex', exerciseIndex);
    }
    else {
      completeRoutine(activeRoutine);
      Session.set('exerciseSequence', false);
      Session.set('routinesState',true);
    }
  }

  function completeRoutine (routine) {
    //Routines.update(routine, {$set: {completed: true}});
    var routinesData = Session.get('routinesData');
    routinesData.forEach(function(item) {
      if (item.id === routine) {
        item.completed = true; 
      }
    });

    Session.set('routinesData', routinesData);

    //GA to track routine completions
    var selectedRoutineId = Session.get('selectedRoutineId');
    var routineNum = 'Routine #' + selectedRoutineId;
    ga('send', 'event', routineNum, 'completed');

    var routinesCompleted = 0;
    routinesData.forEach(function(routine) {
        if (routine.completed) {
          routinesCompleted++;
        }
    }); 

    if (routinesCompleted === routinesData.length) {
      ga('send', 'event', 'All Routines', 'completed');
    }
  }


  function timeLeft() {
    if (timer > 0) {
      timer--;
      Session.set("timer", timer);
    } else {
      nextExercise();
    }
  };

  function toggleTimer() {

      var timerRunning = Session.get('timerRunning');

      var selectedRoutineId = Session.get('selectedRoutineId');
      var routineNum = 'Routine #' + selectedRoutineId;

      if (timerRunning) { 
        Session.set('timerRunning', false);
        Meteor.clearInterval(interval);

        ga('send', 'event', routineNum, 'paused');

      } else {
        Session.set('timerRunning', true);
        interval = Meteor.setInterval(timeLeft, 1000);

        ga('send', 'event', routineNum, 'resumed');
      }
  };
  


}







