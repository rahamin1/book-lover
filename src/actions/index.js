import Firebase from 'firebase';

/* Initializing Firebase */
const config = {
  apiKey: "AIzaSyCadC0b2xH9rEdmi36iA-VcFnPtq2ZQQ68",
  authDomain: "booklover-e6bd2.firebaseapp.com",
  databaseURL: "https://booklover-e6bd2.firebaseio.com"
};
export const fire = Firebase.initializeApp(config);
export const checkConnection = fire.database().ref(`.info/connected`);

// function to replace '.' in email addresses to ','
// in order to be able to write them into firebase
export function encodeUserEmail(userEmail) {
  return userEmail.replace(".", ",");
}

/*
export function decodeUserEmail(userEmail) {
  return userEmail.replace(",", ".");
}
*/
