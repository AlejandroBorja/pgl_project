import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonPage, IonLabel, IonInput, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle, IonHeader } from '@ionic/react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { AppContext, AppContext2, AppContext3, AppContext4 } from '../App';
import { useHistory } from 'react-router';

const auth = getAuth();



const Login: React.FC = () => {
  const {email, setEmail} = useContext(AppContext3);
  const {password, setPassword} = useContext(AppContext4);
  const { user, setUser } = useContext(AppContext);
  const {loggedIn, setLoggedIn} = useContext(AppContext2);
  const history = useHistory();
  
   const handlePersistence = ()=>{
    localStorage.setItem('emailKey', email);
    localStorage.setItem('passwordKey', password);
   }
  

  useEffect(() => {  
    
  }, []);

  
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password);
    console.log(auth);
    console.log(email);
    signInWithEmailAndPassword(auth,email , password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setLoggedIn(true);
        handlePersistence();
        history.push('/home');
      })
      .catch((error) => {
        console.error('Error en inicio de sesión con email: ', error);
        
      });
  };

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Inicio de Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1 className="text-center pt-4">LOGIN</h1>
        <form onSubmit={handleEmailLogin} className="ion-padding-top">
          <IonLabel>Email:</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
            required
          />
          <IonLabel>Contraseña:</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            required
          />
          <IonButton expand="full" type="submit" className="ion-margin-top">
            Iniciar Sesión
          </IonButton>
        </form>
        
      </IonContent>
    </IonPage>
  );
};

export default Login;
 