import React, { useContext } from "react";
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from "@ionic/react";
import { clipboard } from "ionicons/icons";
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from "../App";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const Header: React.FC = () => {
  const { user, setUser } = useContext(AppContext);
 

  const history = useHistory(); 

  const handleIcon = () => {
    history.push('/home');
  };

  const hazLogout = () => {
    signOut(auth)
      .then(() => {
      
        history.push('/login');
        localStorage.removeItem('emailKey');
        localStorage.removeItem('passwordKey');
        setUser(null);
        
      })
      .catch((e) => console.error(e));
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <div className="d-flex align-items-center gap-2 cursor-pointer " onClick={handleIcon} >
            <IonIcon icon={clipboard}style={{ fontSize: '24px', color: '#ff4081', marginLeft: '5px' }} />
            <IonTitle className="text-xl font-semibold text-pink-600" style={{ marginRight: '1px' }} >MyToDoList</IonTitle>
          </div>
        </IonButtons>
        <IonButtons slot="end">
          {user ? (
            <>
              <IonButton onClick={hazLogout}>Logout</IonButton>
            </>
          ) : (
            <>
              <IonButton
                className="bg-info text-white  btn btn-primary"
                onClick={() =>history.push('/login') }
              >
                Login
              </IonButton>
              <IonButton onClick={() => history.push('/register')}>
                regístrate
              </IonButton>
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
