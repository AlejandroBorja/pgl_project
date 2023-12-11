import { Task } from "../components/TaskList";
import { db } from "./index";
import { doc, collection, addDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";



export const addNewTask = async (userId: any,task: Task): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await addDoc(collection(userDocRef, `'tasks'${userId}`), task);
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

export const getTasks = async (userId: any): Promise<Task[]> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const querySnapshot = await getDocs(collection(userDocRef, `'tasks'${userId}`));

    const tasks = querySnapshot.docs.map(doc => {
      const data = doc.data() as { title: string; description: string; level: any  };
      return { ...data, id: doc.id };
    });

    return tasks;
  } catch (error) {
    console.error("Error getting tasks: ", error);
    throw error;
  }
}

export const updateTask = async (userId: any,task: any): Promise<void> => {
  try {
  
    const userDocRef = doc(db, 'users', userId);
    await setDoc(doc( userDocRef, `'tasks'${userId}`, task.id), {
      title: task.title,
      description: task.description,
      level: task.level
    });
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
}

export const deleteTask = async (userId: any,id: string): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(doc(userDocRef, `'tasks'${userId}`, id));
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}
