import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyC96Qxp7E4HMS_Xql14zq2p2PuLhIaCwYA',
   authDomain: 'shopka-2e282.firebaseapp.com',
   projectId: 'shopka-2e282',
   storageBucket: 'shopka-2e282.appspot.com',
   messagingSenderId: '119538266078',
   appId: '1:119538266078:web:60103a535b7e02db9d374f',
   measurementId: 'G-JCJ65S8NLM',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
