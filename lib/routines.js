Routines = new Mongo.Collection('routines');

// Initialize a seed activity
Meteor.startup(function() {
  if (Meteor.isServer && Routines.find().count() === 0) {
   
	Routines.insert({
		name: 'Upper',
		description: 'Description of routine 1',
		id: '1',
		exercises: [
		{
			name: 'breathe deeply',
			description: 'Inhale through your nose for a count of 5, hold for a count of 3, and exhale through your mouth for a count of 5. Repeat.',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'arm + shoulder',
			description: 'Interlace your fingers with your palms facing forward. Slowly lift your arms until your palms are facing upward.',
			imagePath: '/images/arm_shoulder.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'chest + shoulder',
			description: 'Interlace fingers behind your back, rotate your arms outward in your shoulder joint and gently raise your arms up until you feel the stretch.',
			imagePath: '/images/chest_shoulder.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'side stretch',
			description: 'Reach your arms up and grab your right elbow with your left hand. Lean to the left, creating a stretch along your side. Switch sides halfway through.',
			imagePath: '/images/side_stretch.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'shake it out',
			description: 'Shake out your hands and arms.',
			imagePath: '',
			duration: 10,
			shortDescription: ''
		}

		]
	});
	Routines.insert({
		name: 'Move',
		description: 'Description of routine 2',
		id: '2',
		exercises: [
		{
			name: 'breathe deeply',
			description: 'Inhale through your nose for a count of 5, hold for a count of 3, and exhale through your mouth for a count of 5. Repeat.',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'toe circles',
			description: 'Hold your leg out in front of you and draw big circles with your toes. 10 counterclockwise, 10 clockwise, and then switch sides.',
			imagePath: '',
			duration: 40,
			shortDescription: ''
		},
		{
			name: 'sitting hamstring',
			description: 'While sitting, straighten one leg in front of you. Flex your toes toward you to enhance the stretch. Hold for 10 seconds and then switch sides. Repeat twice on each leg.',
			imagePath: '/images/sitting_hamstring.jpg',
			duration: 40,
			shortDescription: 'Hold for 8-10 seconds, switch sides. Repeat twice for each leg.'
		},
		{
			name: 'finger spread',
			description: 'With your hands in front of you, alternate between clenching your fists and opening your hands as wide as possible.',
			imagePath: '/images/finger_spread.jpg',
			duration: 10,
			shortDescription: ''
		},
		{
			name: 'hands behind head',
			description: 'Interlace your hands behind your head and pull your elbows back.',
			imagePath: '/images/hands_behind_head.jpg',
			duration: 20,
			shortDescription: ''
		}


		]
	});
	Routines.insert({
		name: 'Lower',
		description: 'Description of routine 3',
		id: "3",
		exercises: [
		{
			name: 'breathe deeply',
			description: 'Inhale through your nose for a count of 5, hold for a count of 3, and exhale through your mouth for a count of 5. Repeat.',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'forward lunge',
			description: 'Spread your legs about 3 feet apart with both toes pointing in front of you. Bend the front leg and keep the back leg straight. Keep the hips looking foward. You should feel the stretch in the hip flexor and calf of the back leg. You can tilt your pelvis backward to enhance the hip flexor stretch.',
			imagePath: '/images/forward_lunge.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'side lunge',
			description: 'Spread your feet wide and lean over to one side, bending the knee into a side lunge, straightening the opposite leg. Lower until you feel a stretch in the groin area of the straight leg.',
			imagePath: '/images/side_lunge.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'quad stretch',
			description: '',
			imagePath: '/images/quad_stretch.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		}


		]
	});
	Routines.insert({
		name: 'Upper',
		description: 'Description of routine 1',
		id: '4',
		exercises: [
		{
			name: 'breathe deeply',
			description: 'Inhale through your nose for a count of 5, hold for a count of 3, and exhale through your mouth for a count of 5. Repeat.',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'arm + shoulder',
			description: 'Interlace your fingers with your palms facing forward. Slowly lift your arms until your palms are facing upward.',
			imagePath: '/images/arm_shoulder.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'chest + shoulder',
			description: 'Interlace fingers behind your back, rotate your arms outward in your shoulder joint and gently raise your arms up until you feel the stretch.',
			imagePath: '/images/chest_shoulder.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'side twist',
			description: 'Sitting up straight, clasp your hands together in front of your chest. Your forearms aligned in front your body, parallel to your chest. Now bring your right elbow towards the back of the room, creating a twist. Hold for five seconds and alternate until the timer is up.',
			imagePath: '/images/side_twist.jpg',
			duration: 40,
			shortDescription: 'Hold for 5 seconds and alternate sides until timer is up.'
		}, 
		{
			name: 'shake it out',
			description: 'Shake out your hands and arms.',
			imagePath: '',
			duration: 10,
			shortDescription: ''
		}

		]
	});
	Routines.insert({
		name: 'Move',
		description: 'Description of routine 2',
		id: '5',
		exercises: [
		{
			name: 'breathe deeply',
			description: 'Inhale through your nose for a count of 5, hold for a count of 3, and exhale through your mouth for a count of 5. Repeat.',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'sitting hamstring',
			description: 'While sitting, straighten one leg in front of you. Flex your toes toward you to enhance the stretch. Hold for 10 seconds and then switch sides. Repeat twice on each leg.',
			imagePath: '/images/sitting_hamstring.jpg',
			duration: 40,
			shortDescription: 'Hold for 8-10 seconds, switch sides. Repeat twice for each leg.'
		},
		{
			name: 'neck stretch',
			description: 'Lower your shoulders and slowly bring your ear towards your shoulder.',
			imagePath: '/images/neck_stretch.jpg',
			duration: 30,
			shortDescription: 'Hold for 10-15 seconds, then switch sides.'
		},
		{
			name: 'hands behind head',
			description: 'Interlace your hands behind your head and pull your elbows back.',
			imagePath: '/images/hands_behind_head.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'wrist flexor',
			description: 'Put one arm out in front of your body with the palm facing forward. With your other hand, gently pull the fingers of the forward palm towards your body. Alternate halfway through.',
			imagePath: '/images/wrist_flexor.jpg',
			duration: 20,
			shortDescription: 'Hold for 10 seconds, then switch sides.'
		}

		]
	});
	Routines.insert({
		name: 'Lower',
		description: 'Description of routine 3',
		id: "6",
		exercises: [
		{
			name: 'alternate nostril breathing',
			description: 'Take deep, slow breaths in and out of your nose',
			imagePath: '',
			duration: 30,
			shortDescription: ''
		},
		{
			name: 'eyes blackout',
			description: 'Squeeze your eyes closed, gently pressing the back of your hands over your eyes. Hold for 20 seconds, then open your eyes and blink rapidly for 10 seconds.',
			imagePath: '/images/eyes_blackout.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'change focus',
			description: 'Fix your gaze on something at least 20ft away, alternate between mid to far distances.',
			imagePath: '',
			duration: 40,
			shortDescription: ''
		},
		{
			name: 'face stretch',
			description: 'Take a deep breath, and on the exhale open your eyes and jaw as wide as you can and stick your tongue out.',
			imagePath: '/images/face_stretch.jpg',
			duration: 20,
			shortDescription: ''
		},
		{
			name: 'forearm massage',
			description: 'Gently massage the muscles in your forearm.',
			imagePath: '',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		}

		]
	});

  }
});

