import React, { useState, useContext } from 'react';
import { IonContent, IonPage, IonLabel, IonInput, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle, IonHeader } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AppContext } from '../App';

const auth = getAuth();

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AppContext);

  const creaUsuario = () => {
    console.log(password);
    console.log(auth);
    console.log(email);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail('');
        setPassword('');
        setUser(user);
      })
      .catch((error) => {
        console.error('Error en registro: ', error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1 className="ion-text-center ion-padding-top">
          ¡Regístrate para obtener acceso a la mejor app del mundo!
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="ion-padding-top">
          <IonLabel>Correo Electrónico:</IonLabel>
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
          <IonButton expand="full" onClick={creaUsuario} className="ion-margin-top">
            Registrarte
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
