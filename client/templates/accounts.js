
Template.loginRegister.events({
    'click .login-btn': function() {
    	Session.set('registering', false);
    	Session.set('loggingIn', true);
    	console.log(Session.get('loggingIn'));
    },
    'click .register-btn': function() {
    	Session.set('registering', true);
    	Session.set('loggingIn', false);	
    }
});

Template.loginRegister.helpers({
	registering: function() {
		return Session.get('registering');
	},
	loggingIn: function() {
		return Session.get('loggingIn');
	}
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        	      if (err) {
        	      	console.log('oops, wrong');
        	      } else{ 

        	      }
        });
    }
});



