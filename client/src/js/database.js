import { openDB } from 'idb';
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