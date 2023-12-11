import React, { useContext, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import Header from '../components/Header';
import { AppContext } from '../App';
import { Reorder } from 'framer-motion';
import { getTasks } from '../firebase/taskController';
import { Task } from '../components/TaskList';


const Home: React.FC = () => {
 const { user } = useContext(AppContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [items, setItems] = useState<Task[]>([]);
  const [cond,setCond]= useState<boolean>(false);

 useEffect(() => {
  console.log(cond); 
}, [cond]);

  useEffect(() => {

    const condition =localStorage.getItem('cond');
    if(condition !==null){
      const conditionInitiation = JSON.parse(condition);
      setCond(conditionInitiation);}
if (user && !cond) {
    const initializeTasks = async () => {
      
        try {
          const tasksData = await getTasks(user.uid);
          setTasks([...tasksData]);
        } catch (error) {
          console.error(error);
        }
      }
      initializeTasks();
      setCond(true);
      console.log(cond)
     console.log( localStorage.setItem('cond', JSON.stringify(cond)));
    };

  }, [user]);


  const handleReorder = (reorderedTasks: Task[]) => {
   
    
    localStorage.setItem('taskOrder', JSON.stringify(tasks));
    setTasks([...reorderedTasks]);
    
    
  };

  useEffect(() => {
    
    if ( cond) {
      const order = localStorage.getItem('taskOrder');
      
      if (order !== null) {
        const orderedTaskIds = JSON.parse(order);
        console.log(orderedTaskIds);
        setTasks(orderedTaskIds);
        console.log(tasks);
      }}
      
    
    }, []);
    

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Bienvenido a la Página de Inicio</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {user ? (
        <div>
          <p>Hola, {user.displayName || user.email} estas son tus tareas ordenadas por prioridad.</p>
          <IonList>
            


          <Reorder.Group values={tasks} onReorder={handleReorder}>
                {tasks.map((tasks) => (
                  <Reorder.Item key={tasks.id} value={tasks}>
                    {tasks.title}
                  </Reorder.Item>
                ))}
          </Reorder.Group>
          </IonList>
        </div>
      ) : (
        <p>Inicia sesión para acceder al contenido personalizado.</p>
      )}
    </IonContent>
  </IonPage>
  );
};

export default Home;
