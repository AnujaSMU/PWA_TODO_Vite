import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

const DB_NAME = 'todoDB';
const STORE_NAME = 'todos';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addTodoToDB = async (todo) => {
  const db = await initDB();
  todo.id = uuidv4(); // Generate a random ID
  return db.add(STORE_NAME, todo);
};

export const getTodosFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteTodoFromDB = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};