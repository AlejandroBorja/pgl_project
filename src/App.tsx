import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TaskList, { Task } from './components/TaskList';
import { home,cart, list, settings, search } from 'ionicons/icons';
import Header from './components/Header';
import { createContext, useContext, useEffect, useState } from 'react';
import Login from './routes/Login';
import Register from './routes/Register';


import '@ionic/react/css/core.css';


import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


import './theme/variable2.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Setting} from './components/Setting';
import TaskSearch from './components/TaskSearch';



setupIonicReact();

export const AppContext = createContext<any>(null);
export const AppContext2 = createContext<any>(null);
export const AppContext3 = createContext<any>(null);
export const AppContext4 = createContext<any>(null);
export const AppContext5 = createContext<any>(null);
const auth = getAuth();

const App: React.FC = () =>{
  const [user, setUser] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailKey');
    const storedPassword = localStorage.getItem('passwordKey');
    console.log(storedEmail);
    console.log(storedPassword);
    console.log("LLego al use effect");
    if (storedEmail && storedPassword) {
    setEmail(storedEmail);
    setPassword(storedPassword)
    initiationEmailLogin();
    console.log("LLego a usar iniatiation");
  }
    
  }, [email]);

  const initiationEmailLogin = () => {
    
    signInWithEmailAndPassword(auth,email , password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setLoggedIn(true);
        console.log("Este de debao es el user");
       console.log(user);
        
      })
      .catch((error) => {
        console.error('Error en inicio de sesión con email: ', error);
        
      });
  };
  

return (
  <IonApp>
    <IonReactRouter>
    <AppContext.Provider value={{ user, setUser }}>
    <AppContext2.Provider value={{ loggedIn, setLoggedIn }}>
    <AppContext3.Provider value={{ email, setEmail }}>
    <AppContext4.Provider value={{ password, setPassword }}>
    <AppContext5.Provider value={{ tasks, setTasks}}>
    <Header/>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home" component={TaskSearch}/> 
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/setting" component={Setting} exact />
        <Route path="/tasklist" component={TaskList} exact />
        <Redirect exact path="/" to="/home" />
          
      </IonRouterOutlet>
  
    
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>

              <IonTabButton tab="setting" href="/setting">
                <IonIcon icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tasklist" href="/tasklist">
                <IonIcon icon={list} />
                <IonLabel>Your List</IonLabel>
              </IonTabButton>


            </IonTabBar>
      </IonTabs>
      </AppContext5.Provider>
      </AppContext4.Provider>
      </AppContext3.Provider>
      </AppContext2.Provider>
      </AppContext.Provider>
    </IonReactRouter>
  </IonApp>
);
};




export default App;
