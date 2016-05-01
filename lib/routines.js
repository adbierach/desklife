Routines = new Mongo.Collection('routines');

// Initialize a seed activity
Meteor.startup(function() {
  if (Meteor.isServer && Routines.find().count() === 0) {
   
	Routines.insert({
		id: '1',
		exercises: [
		{
			name: 'Breathe Deeply',
			description: 'Breathing in, I know I am breathing in. Breathing out, I know I am breathing out.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Arm and Shoulder',
			description: 'Interlace your fingers with your palms facing forward. Slowly lift your arms until your palms are facing upward.',
			imagePath: '/images/arm_shoulder.jpg',
			duration: 20
		},
		{
			name: 'Chest and Shoulder',
			description: 'Interlace fingers behind your back, rotate your arms outward in your shoulder joint and gently raise your arms up until you feel the stretch.',
			imagePath: '/images/chest_shoulder.jpg',
			duration: 20
		},
		{
			name: 'Side Stretch',
			description: 'Reach your arms up and grab your right elbow with your left hand. Lean to the left, creating a stretch along your side. Switch sides halfway through.',
			imagePath: '/images/side_stretch.jpg',
			duration: 20,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'Shake It Out',
			description: 'Shake out your hands and arms.',
			imagePath: '',
			duration: 10
		}

		]
	});
	Routines.insert({
		id: '2',
		exercises: [
		{
			name: 'Reflection',
			description: 'Think about a time someone did something nice for you.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Toe Circles',
			description: 'Hold your leg out in front of you and draw big circles with your toes. 10 counterclockwise, 10 clockwise, and then switch sides.',
			imagePath: '',
			duration: 40
		},
		{
			name: 'Sitting Hamstring',
			description: 'While sitting, straighten one leg in front of you. Flex your toes toward you to enhance the stretch. Hold for 10 seconds and then switch sides. Repeat twice on each leg.',
			imagePath: '/images/sitting_hamstring.jpg',
			duration: 40,
			shortDescription: 'Alternate sides every 10 seconds.'
		},
		{
			name: 'Finger Spread',
			description: 'With your hands in front of you, alternate between clenching your fists and opening your hands as wide as possible.',
			imagePath: '/images/finger_spread.jpg',
			duration: 10
		},
		{
			name: 'Hands Behind Head',
			description: 'Interlace your hands behind your head and pull your elbows back.',
			imagePath: '/images/hands_behind_head.jpg',
			duration: 20
		}


		]
	});
	Routines.insert({
		id: "3",
		exercises: [
		{
			name: 'Focus',
			description: 'Bring your attention to your left pinky toe. Go ahead, wiggle it.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Forward Lunge',
			description: 'Spread your legs about 3 feet apart with both toes pointing in front of you. Bend the front leg and keep the back leg straight. Keep the hips looking foward. You should feel the stretch in the hip flexor and calf of the back leg. You can tilt your pelvis backward to enhance the hip flexor stretch.',
			imagePath: '/images/forward_lunge.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'Side Lunge',
			description: 'Spread your feet wide and lean over to one side, bending the knee into a side lunge, straightening the opposite leg. Lower until you feel a stretch in the groin area of the straight leg.',
			imagePath: '/images/side_lunge.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		},
		{
			name: 'Quad Stretch',
			description: '',
			imagePath: '/images/quad_stretch.jpg',
			duration: 40,
			shortDescription: 'Switch sides halfway.'
		}


		]
	});
	Routines.insert({
		id: '4',
		exercises: [
		{
			name: 'Breathe Deeply',
			description: 'Breathing in, I know that I am breathing in. Breathing out, I know that I am breathing out.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Arm and Shoulder',
			description: 'Interlace your fingers with your palms facing forward. Slowly lift your arms until your palms are facing upward.',
			imagePath: '/images/arm_shoulder.jpg',
			duration: 20
		},
		{
			name: 'Chest and Shoulder',
			description: 'Interlace fingers behind your back, rotate your arms outward in your shoulder joint and gently raise your arms up until you feel the stretch.',
			imagePath: '/images/chest_shoulder.jpg',
			duration: 20
		},
		{
			name: 'Side Twist',
			description: 'Sitting up straight, clasp your hands together in front of your chest. Your forearms aligned in front your body, parallel to your chest. Now bring your right elbow towards the back of the room, creating a twist. Hold for five seconds and alternate until the timer is up.',
			imagePath: '/images/side_twist.jpg',
			duration: 40,
			shortDescription: 'Alternate sides every 10 seconds.'
		}, 
		{
			name: 'Shake It Out',
			description: 'Shake out your hands and arms.',
			imagePath: '',
			duration: 10
		}

		]
	});
	Routines.insert({
		id: "5",
		exercises: [
		{
			name: 'Alternate Nostril Breathing',
			description: 'Cover one nostril. Breathe slowly in and out through the open nostril. Switch nostrils and repeat.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Eyes Blackout',
			description: 'Squeeze your eyes closed, gently pressing the back of your hands over your eyes. Hold for 20 seconds, then open your eyes and blink rapidly for 10 seconds.',
			imagePath: '/images/eyes_blackout.jpg',
			duration: 20
		},
		{
			name: 'Change Focus',
			description: 'Fix your gaze on something at least 20ft away, alternate between mid to far distances.',
			imagePath: '',
			duration: 40
		},
		{
			name: 'Face Stretch',
			description: 'Take a deep breath, and on the exhale open your eyes and jaw as wide as you can and stick your tongue out.',
			imagePath: '/images/face_stretch.jpg',
			duration: 20
		},
		{
			name: 'Forearm Massage',
			description: 'Gently massage the muscles in your forearm.',
			imagePath: '',
			duration: 40
		}

		]
	});
	Routines.insert({
		id: '6',
		exercises: [
		{
			name: 'Breathe Deeply',
			description: 'Breathing in, I know that I am breathing in. Breathing out, I know that I am breathing out.',
			imagePath: '',
			duration: 30
		},
		{
			name: 'Sitting Hamstring',
			description: 'While sitting, straighten one leg in front of you. Flex your toes toward you to enhance the stretch. Hold for 10 seconds and then switch sides. Repeat twice on each leg.',
			imagePath: '/images/sitting_hamstring.jpg',
			duration: 40
		},
		{
			name: 'Neck Stretch',
			description: 'Lower your shoulders and slowly bring your ear towards your shoulder.',
			imagePath: '/images/neck_stretch.jpg',
			duration: 30
		},
		{
			name: 'Hands Behind Head',
			description: 'Interlace your hands behind your head and pull your elbows back.',
			imagePath: '/images/hands_behind_head.jpg',
			duration: 20
		},
		{
			name: 'Wrist Flexor',
			description: 'Put one arm out in front of your body with the palm facing forward. With your other hand, gently pull the fingers of the forward palm towards your body. Alternate halfway through.',
			imagePath: '/images/wrist_flexor.jpg',
			duration: 20
		}

		]
	});


  }
});

