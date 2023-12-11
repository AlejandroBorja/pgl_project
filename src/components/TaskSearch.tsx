// TaskSearch.tsx
import React, { useState, useEffect, useContext } from 'react';
import { IonPage, IonContent, IonSelect, IonSelectOption, IonCard, IonCardContent, IonTextarea } from '@ionic/react';
import { LEVELS, Task } from './TaskList'; 
import { AppContext, AppContext5 } from '../App';
import { getTasks } from '../firebase/taskController';


interface TaskSearchProps {
  tasks: Task[];
}

const TaskSearch: React.FC<TaskSearchProps> = () => { 
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const { user } = useContext(AppContext);
  const {tasks, setTasks} = useContext(AppContext5);
  
  const initializeTasks = async () => {
    try {
      const tasksData = await getTasks(user.uid);
      setTasks([...tasksData]);
      setFilteredTasks([...tasksData]); 
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    initializeTasks();
  },[user]);

  useEffect(() => {
    
    filterTasksByLevel();
    
  }, [selectedLevel, tasks]); 

  const filterTasksByLevel = () => {
    if (selectedLevel === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks ? tasks.filter((task: { level: string | undefined; }) => task.level === selectedLevel) : [];
      setFilteredTasks(filtered);
    }
  };

  return (
    <IonPage>
      <IonContent>
      <h2>Introduce una nueva tarea</h2>
      {user ? (
      <div > 
        
        <IonSelect
          placeholder="Filtrar por nivel"
          value={selectedLevel}
          onIonChange={(e: CustomEvent<any>) => setSelectedLevel(e.detail.value)}
          interface="popover"
          style={{ marginLeft: '22px' }}
        >
            
          <IonSelectOption value="all">Mostrar todas</IonSelectOption>
          <IonSelectOption value={LEVELS.NORMAL}>Normal</IonSelectOption>
          <IonSelectOption value={LEVELS.URGENT}>Urgente</IonSelectOption>
          <IonSelectOption value={LEVELS.BLOCKING}>Bloqueante</IonSelectOption>
        </IonSelect>

      
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <IonCard key={task.id}>
              <IonCardContent>
                
                <p>{task.title}</p>
                <p>{task.description}</p>
              
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <IonCard>
            <IonCardContent>
              <p>No hay tareas filtradas</p>
            </IonCardContent>
          </IonCard>
        )} 
        </div> 
        ) : (
            
            <p>Inicia sesión para acceder al contenido.</p>
          )}
        
      </IonContent>
    </IonPage>
  );
};

export default TaskSearch;
