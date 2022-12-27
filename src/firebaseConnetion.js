import{ initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_27OlOUDwO7ZNVpzh9J2qPldEmTJC5FE",
  authDomain: "projeto-notas-9d001.firebaseapp.com",
  projectId: "projeto-notas-9d001",
  storageBucket: "projeto-notas-9d001.appspot.com",
  messagingSenderId: "229293925204",
  appId: "1:229293925204:web:f24a72ee46c53a0d695ec1",
  measurementId: "G-T5V1SJ0WPK"
};


  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  export {db, auth};
