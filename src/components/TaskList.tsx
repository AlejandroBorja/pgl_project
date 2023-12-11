import React, { useContext, useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLoading,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { addNewTask,deleteTask,
getTasks,
updateTask} from '../firebase/taskController';
import { AppContext, AppContext5 } from '../App';
import './TaskList.css';

export enum LEVELS {
    NORMAL = 'normal',
    URGENT = 'urgent',
    BLOCKING = 'blocking',
  }
export interface Task {
 id?: string;
  title: string;
  description: string;
  level: LEVELS; 
}


const TaskList: React.FC = () => {
  const { user } = useContext(AppContext);
  const [task, setTask] = useState({ title: '', description: '',level: LEVELS.NORMAL });
  const [mode, setMode] = useState<'add' | 'update'>('add');
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const {tasks, setTasks} = useContext(AppContext5);

  
  const clearFilter = () => {
    setFilteredTasks([]);
  };

  const taskStyle: React.CSSProperties = {
    fontWeight: 'bold',
  };

  const getBadgeColor = (level: LEVELS) => {
    switch (level) {
      case LEVELS.NORMAL:
        return 'primary';
      case LEVELS.URGENT:
        return 'warning';
      case LEVELS.BLOCKING:
        return 'danger';
      default:
        return 'primary';
    }
  };
  

  const createNewTask = async () => {
    if (user) {
      setLoading(true);
      await addNewTask(user.uid, task); 
      setTask({ title: '', description: '', level: LEVELS.NORMAL });
      initializeTasks();
      setLoading(false);
    }
  };

  const updateExistingTask = async () => {
    if (user) {
      setLoading(true);
      await updateTask(user.uid, task); 
      setTask({ title: '', description: '', level: LEVELS.NORMAL});
      initializeTasks();
      setMode('add');
      setLoading(false);
    }
  };

 const initializeTasks = () => {
    if (user) {
      setLoading(true);
      getTasks(user.uid) 
        .then((t) => setTasks([...t]))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  };

  const editTask = (id: string) => {
    
    setMode('update');
    const taskToEdit = tasks.find((t: any) => t.id === id);
    console.log(taskToEdit);
    if (taskToEdit) {
      setTask({ ...taskToEdit });
      console.log(taskToEdit);
    }
  };

  const removeTask = async (id: string) => {
    if (user) {
      setLoading(true);
      await deleteTask(user.uid, id); 
      initializeTasks();
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeTasks();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Estás en la tasklist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      {user ? (
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>Introduce una nueva tarea</h2>
              <IonInput
                value={task.title}
                placeholder="Título"
                onIonInput={(e) => setTask({ ...task, title: e.detail.value! })}
              />
              <IonTextarea
                rows={3}
                value={task.description}
                placeholder="Descripción"
                onIonInput={(e) => setTask({ ...task, description: e.detail.value! })}
              />
              <IonSelect
                value={task.level}
                onIonChange={(e) => setTask({ ...task, level: e.detail.value as LEVELS })}
                interface="popover"
              >
                <IonSelectOption value={LEVELS.NORMAL}>Normal</IonSelectOption>
                <IonSelectOption value={LEVELS.URGENT}>Urgent</IonSelectOption>
                <IonSelectOption value={LEVELS.BLOCKING}>Blocking</IonSelectOption>
              </IonSelect>
              <IonButton
                expand="full"
                onClick={() => (mode === 'add' ? createNewTask() : updateExistingTask()) }
              >
                {mode === 'add' ? 'Añadir' : 'Actualizar'}
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            {tasks.map((task: any) => (
              <IonCol size="12" sizeMd="4" key={task.id}>
                <IonCard className="mb-3" >
                <h6 className='mb-0'>
                      <span className={`badge bg-${getBadgeColor(task.level)}`}>{task.level}</span>
                </h6>
                  <IonCardHeader>
                    <IonTitle className="task-title" >{task.title}</IonTitle>
                  </IonCardHeader>
                  <IonCardContent >
                    <p className="task-description" style={{ marginLeft: '22px' }}>{task.description}</p>
                    <IonButton style={{ marginLeft: '22px' }} onClick={() => editTask(task.id)}>Editar</IonButton>
                    <IonButton
                      color="danger"
                      style={{ marginLeft: '22px' }}
                      onClick={() =>
                        window.confirm('¿Seguro que quieres eliminar esta tarea?') && removeTask(task.id)
                      }

                    >
                      Eliminar
                    </IonButton>
                    
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        ) : (
          <p>Inicia sesión para acceder al contenido personalizado.</p>
        )}
        <IonLoading isOpen={loading} message="Cargando..." />
      </IonContent>
    </IonPage>
  );
};



export default TaskList;
