Template.exitSequenceModal.events({
  'click .return-to-routine': function() {
    Session.set('exitingSequence', false);
  },

  'click .confirm-exit': function() {
    Session.set('exitingSequence', false);
    Session.set('exerciseSequence', false);
    Session.set('routinesState',true);
  }
});

Template.nextExerciseModal.helpers({
  nextExerciseTimer: function () {
    return Session.get('nextExerciseTimer');
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

  nextExercise : function () {
    return Session.get('nextExercise');
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
    var selectedExercise = this;
    var timerRunning = Session.get('timerRunning');
    
    if (timerRunning) { 
      toggleTimer();
    }
    Session.set('selectedExercise', selectedExercise);
    Session.set('viewingExercise', true);

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

    //prevent screen from sleeping
    if (Meteor.isCordova) {
      window.plugins.insomnia.keepAwake();
    }
});

Template.routineSequence.onDestroyed(function(){
    Meteor.clearInterval(interval);

    //allow screen to sleep
    if (Meteor.isCordova) {
      //delay bc screen will fade immediately after sequence ends
      setTimeout(function () {
        window.plugins.insomnia.allowSleepAgain();
      }, 20000)
    }
});

startSequence = function() {
  var initialExerciseIndex = 0,
  activeRoutine = Session.get('activeRoutine'),
  initialExercise = activeRoutine.exercises[initialExerciseIndex];

  timer = initialExercise.duration; 
  interval = Meteor.setInterval(sequenceTimer, 1000);
  
  Session.set('timer', timer);
  Session.set('activeExerciseIndex', initialExerciseIndex);
  Session.set('timerRunning', true);
}

sequenceTimer = function() {
  if (timer > 0) {
    timer--;
    Session.set('timer', timer);
  } else {
    nextExercise();
  }
};

nextExercise = function() {
  var previousExerciseIndex = Session.get('activeExerciseIndex'),
  upcomingExerciseIndex = previousExerciseIndex + 1;
  activeRoutine = Session.get('activeRoutine'),
  exerciseList = activeRoutine.exercises,
  upcomingExercise = exerciseList[upcomingExerciseIndex];

  if (Meteor.isCordova) {
    window.navigator.vibrate(5000);
  }


  if (upcomingExerciseIndex < exerciseList.length) {

    //show nextExerciseModal and update nextexcercisetimer
    Session.set('nextExercise', true);
    var nextExerciseTimer = 3;
    Session.set('nextExerciseTimer', nextExerciseTimer);

    //pause timer & swap out content with next exercise content
    toggleTimer();
    timer = upcomingExercise.duration;
    Session.set('timer', timer);
    Session.set('activeExerciseIndex', upcomingExerciseIndex);


    var nextExerciseInterval = Meteor.setInterval(function () {
      
      var didNextExerciseCountdownStop;      

      if ( nextExerciseTimer > 1) {
        nextExerciseTimer--;
        Session.set('nextExerciseTimer', nextExerciseTimer);
      }

      else {
        //update view with next exercise info; only run once
        if (!didNextExerciseCountdownStop) {
          Meteor.clearInterval(nextExerciseInterval);
          toggleTimer();
          Session.set('nextExercise', false);
        }
        didNextExerciseCountdownStop = true;
      }

    }, 1000);

  }
  else {
    completeRoutine(activeRoutine);
  }
}

completeRoutine = function(routine) {
    Meteor.call('logCompletedRoutine', routine._id);
    Router.go('/');
}


toggleTimer = function() {
    var timerRunning = Session.get('timerRunning');

    if (timerRunning) { 
      Session.set('timerRunning', false);
      Meteor.clearInterval(interval);

    } else {
      Session.set('timerRunning', true);
      interval = Meteor.setInterval(sequenceTimer, 1000);

    }
};