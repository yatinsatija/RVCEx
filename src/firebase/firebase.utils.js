import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${additionalData.rvceMailId}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {
      name,
      usn,
      socialMediaHandle,
      roomNumber,
      mobileNumber,
      rvceMailId,
      tokens,
    } = additionalData;

    try {
      await userRef.set({
        name,
        usn,
        roomNumber,
        mobileNumber,
        rvceMailId,
        socialMediaHandle,
        tokens,
      });
    } catch (error) {
      alert("Error creating user!");

      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
