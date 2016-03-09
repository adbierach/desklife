Template.routineDetail.helpers({
  viewingExercise : function () {
    return Session.get('viewingExercise');
  }
});

// Template.routineDetail.events({
//   'click .exercise': function() {
//     var selectedExercise = this;

//     Session.set('selectedExercise', selectedExercise);
//     Session.set('viewingExercise', true);

//   },
// });
