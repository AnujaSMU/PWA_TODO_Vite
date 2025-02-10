import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

const DB_NAME = 'todoDB';
const STORE_NAME = 'todos';

/**
 * Initializes the IndexedDB database.
 * 
 * @returns {Promise<IDBDatabase>} A promise that resolves to the opened database.
 */
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

/**
 * Adds a todo to the IndexedDB database.
 *  
 * @param {Object} todo The todo object to add.
 * @returns {Promise<IDBValidKey>} A promise that resolves to the key of the added record.
 */
export const addTodoToDB = async (todo) => {
  const db = await initDB();
  todo.id = uuidv4(); // Generate a random ID
  return db.add(STORE_NAME, todo);
};

/**
 * Retrieves all todos from the IndexedDB database.
 * 
 * @returns {Promise<Object[]>} A promise that resolves to an array of todos.
 */

export const getTodosFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

/**
 * Deletes a todo from the IndexedDB database.
 * 
 * @param {string} id The ID of the todo to delete.
 * @returns {Promise<void>} A promise that resolves when the todo is deleted.
 */
export const deleteTodoFromDB = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};