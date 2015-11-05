Router.route('/register');

Router.route('/login');

Router.route('/', {
	template: 'routinesList'
});

Router.configure({
	layoutTemplate: 'main'
});