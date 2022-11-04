import { openDB } from 'idb';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
    // we are creating a new database named 'contact_db' which will be using the version 1 of the database
    openDB("contact_db", 1, {
        upgrade(db){
            if(db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            db.createObjectStore('contacts', {keyPath: 'id', autoIncrement: true});
            console.log('contacts store created')
        }
    })
}

export const getDb = async () => {
    console.log('GET from the database');

    // create a connection to the indexedDB database and the version we want to use.
    const contactDB = await openDB('contact_db', 1);

    // create new transaction and specify the store and data privileges
    const tx = contactDB.transaction('contacts', 'readonly');

    // open up the desired object store
    const store = tx.objectStore('contacts');

    // use the .getall() method to get all data in the database
    const request = store.getAll();

    // get confirmation of the request
    const result = await request;
    console.log('results.value', result);
    return result;
};

// Export a function we will use to POST to the database.
export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');
  
    // Create a connection to the database and specify the version we want to use.
    const contactDb = await openDB('contact_db', 1);
  
    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contacts', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('contacts');
  
    // Use the .add() method on the store and pass in the content.
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });
  
    // Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  }


  export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
  
    // Create a connection to the IndexedDB database and the version we want to use.
    const contactDb = await openDB('contact_db', 1);
  
    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contacts', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('contacts');
  
    // Use the .delete() method to get all data in the database.
    const request = store.delete(id);
  
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };

  export const editDb = async (id, name, email, phone, profile) => {
    const connectDb = await openDB('contact_db', 1);

    const tx = connectDb.transaction('contacts', 'readwrite');

    const store = tx.objectStore('contacts');

    const request = store.put({id: id, name: name, email: email, phone: phone, profile: profile})

    const result = await request;
    console.log('data have been updated to:', result);
  }