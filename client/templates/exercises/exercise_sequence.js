var totalTimeLeft = 0;
var timer = 0;


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
Template.pauseSequenceModal.onRendered( function () {
  setTimeout(function() {
      $('.pause-sequence-modal').addClass('show');
  }, 50);
});
Template.pauseSequenceModal.helpers({
  timerRunning: function () {
    return Session.get('timerRunning');
  }
});

Template.pauseSequenceModal.events({
  'click .pause, click .resume': function() {
    toggleTimer();
  },
  'click .close-pause-overlay': function () {
    $('.pause-sequence-modal').removeClass('show');
    setTimeout(function() {
    Session.set('pauseOverlay', false);
    }, 500);
  },
  'click .exit-sequence': function() {
    Session.set('pauseOverlay', false);
    Session.set('exerciseSequence', false);
    Session.set('routinesState',true);
    console.log('test');
  }
});

Template.nextExerciseModal.helpers({
  nextExerciseTimer: function () {
    return Session.get('nextExerciseTimer');
  }
});

Template.exerciseDetail.onRendered( function () {
  setTimeout(function() {
      $('.exercise-detail').addClass('show');
  }, 50);
});

Template.exerciseDetail.helpers({
  activeExercise: function () {
    var activeExerciseIndex = Session.get('activeExerciseIndex');
    return this.exercises[activeExerciseIndex];
  }
});

Template.exerciseDetail.events({
  'click .close-wrapper': function() {
    $('.exercise-detail').removeClass('show');
    setTimeout(function() {
    Session.set('viewingExercise', false);
    }, 500);
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
  pauseOverlay : function () {
    return Session.get('pauseOverlay');
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

  exitingSequence: function () {
    return Session.get('exitingSequence');
  },
  totalTimeLeft: function () {
    var totalTimeLeft = Session.get('totalTimeLeft');
    var minutes = Math.floor(totalTimeLeft / 60);
    var seconds = totalTimeLeft % 60;
    if (seconds.toString().length === 1) {
      seconds = '0' + seconds;
    }

    var displayTime = minutes + ':' + seconds; 

    return displayTime;
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
  'click .add-time': function () {
   timer += 10;
   totalTimeLeft += 10;
  },
  'click .subtract-time': function () {
    timer -= 10;
    if (timer > 0) {
      totalTimeLeft -= 10;
    }
  },

  'click .view-exercise-info': function() {
    var selectedExercise = this;
    Session.set('selectedExercise', selectedExercise);
    Session.set('viewingExercise', true);

  },
  'click .show-pause-overlay' : function () {
    Session.set('pauseOverlay', true);
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
    //reset 
    totalTimeLeft = 0;

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

  activeRoutine.exercises.forEach(function(exercise) {
    totalTimeLeft += exercise.duration;
    console.log(totalTimeLeft);
  });

  timer = initialExercise.duration; 

  interval = Meteor.setInterval(sequenceTimer, 1000);
  
  Session.set('timer', timer);
  Session.set('totalTimeLeft',totalTimeLeft);
  Session.set('activeExerciseIndex', initialExerciseIndex);
  Session.set('timerRunning', true);
}

sequenceTimer = function() {
  if (timer > 0) {
    timer--;
    Session.set('timer', timer);
    totalTimeLeft--;
    Session.set('totalTimeLeft', totalTimeLeft);
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