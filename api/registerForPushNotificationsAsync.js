import { Constants, Permissions, Notifications } from 'expo';
import { firebaseApp } from '../firebase/FirebaseConfig'

export default (async function registerForPushNotificationsAsync() {
  // Remote notifications do not work in simulators, only on device
  if (!Constants.isDevice) {
    return;
  }

  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()
  let id = token.substring(18,39)
  console.log(id)
	firebaseApp.database().ref().child('tokens').child(id).set(token);
});
