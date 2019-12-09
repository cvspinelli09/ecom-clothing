import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyApIvOviLvbhBYL4JiVWfgRX2t5E87eHDU",
    authDomain: "crwn-db-91e56.firebaseapp.com",
    databaseURL: "https://crwn-db-91e56.firebaseio.com",
    projectId: "crwn-db-91e56",
    storageBucket: "crwn-db-91e56.appspot.com",
    messagingSenderId: "881917605609",
    appId: "1:881917605609:web:fc066f2ffc1590ae1aa278",
    measurementId: "G-3T7G016X32"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('DEU RUIM AQUI', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

