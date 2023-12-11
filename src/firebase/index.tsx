

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const vapidKey = "BBYTxJceVEb-qB3C8EYuWNYN3BGZhGDyoCL9SvyWVS6OtJwwXkTsmevhCcGp49eXxuJSNJU-SMkqdQMZmFstK6A"

export const firebaseConfig = {
    apiKey: "AIzaSyCc180Hr297MxGVGUlGiqNqT304Zkr1Qr4",
    authDomain: "pglproject-fe948.firebaseapp.com",
    projectId: "pglproject-fe948",
    storageBucket: "pglproject-fe948.appspot.com",
    messagingSenderId: "953349069081",
    appId: "1:953349069081:web:6d7461effa59e4fea00d88"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
