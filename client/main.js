  

  Template.main.onCreated(function() {
    //this.subscribe('userData');
    this.subscribe('routines');
  });

  
  // var sound;
  // var audioPath;

  // Meteor.startup(function() {
  //   if (Meteor.isCordova) {

  //     audioPath = (cordova.file.applicationDirectory + 'www/application/app/' + 'audio/sound.mp3').replace('file://', '');
  //     alert(audioPath);
      
  //   } else {
  //     audioPath = 'audio/sound.mp3';
  //   }

  //   sound = new Howl({
  //     src: [audioPath],
  //     onloaderror: function() {
  //       alert('no go schmohawk');
  //     }
  //   });
  // });