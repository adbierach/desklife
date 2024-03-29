// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.observe.DeskLife',
  name: 'DeskLife',
  description: 'Work Smarter. Feel Better.',
  author: 'Observe LLC',
  email: 'info@desklife.io',
  website: 'http://desklife.io'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/iphone.icon.png',
  'iphone_2x': 'icons/iphone_2x.icon.png',
  'iphone_3x': 'icons/iphone_3x.icon.png'
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'iphone': 'splash/iphone.splash.png',
 'iphone_2x': 'splash/iphone_2x.splash.png',
 'iphone5': 'splash/iphone5.splash.png',
 'iphone6': 'splash/iphone6.splash.png',
 'iphone6p_portrait': 'splash/iphone6p_portrait.splash.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff1c2d4c');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('DisallowOverscroll', true);
//App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('StatusBarBackgroundColor', '#000000');

App.accessRule("http://app.desklife.io");
// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });