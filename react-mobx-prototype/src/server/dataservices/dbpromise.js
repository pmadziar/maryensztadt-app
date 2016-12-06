import { MongoClient } from 'mongodb';
import config from "../config";


const getDb = () => {
    return new Promise((resolve, reject)=>{
        try {
            resolve(MongoClient.connect(config.mongodburl));
        } catch (error) {
            reject(error);
        }
    });
};

const db = getDb();

export const closeDb = () => {
    db.then((database)=>{
        if(database){
            database.close();
        }
    });
};

export default db;
