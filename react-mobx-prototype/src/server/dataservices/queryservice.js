import {ObjectID} from 'mongodb';
import dbpromise from "./dbpromise";

export const defaultCollation = {
    'locale': `pl`,
    strength: 2,
    caseLevel: false
};

export const getDocuments = (collectionName, filter, limit, skip, sort, project) => {
    return new Promise((resolve, reject) => {
        try {
            let db;

            if (!collectionName || collectionName === ``) {
                throw new Error(`collectionName not specified`);
            }

            dbpromise.then((database)=>{
                if (!database) {
                    throw new Error(`Not connected to the Mongodb`);
                }
                db = database;
                return db.listCollections({
                    name: collectionName
                }).toArray();
            }).then((collections) => {
                if (collections.length !== 1) {
                    throw new Error(`Collection ${collectionName} doesn't exist`);
                }
                return db.collection(collectionName);
            }).then((collection) => {
                return collection.find(filter || {}, undefined, {
                    collation: defaultCollation
                });
            }).then((cursor) => {
                return cursor;
            }).then((cursor) => {
                if (limit) cursor = cursor.limit(limit);
                return cursor;
            }).then((cursor) => {
                if (skip) cursor = cursor.skip(skip);
                return cursor;
            }).then((cursor) => {
                if (project) cursor = cursor.project(project);
                return cursor;
            }).then((cursor) => {
                if (sort) cursor = cursor.sort(sort, undefined, {
                    collation: defaultCollation
                });
                return cursor;
            }).then((cursor) => {
                let data = cursor.toArray();
                return data;
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const getDocumentById = (collectionName, id) => {
    return new Promise((resolve, reject)=>{
        try {
            if(!id || id===``){
                throw new Error(`The id parameter is mandatory`);
            }
            getDocuments(collectionName, {_id: new ObjectID(id)})
            .then((docs)=>{
                if(docs && docs.length === 1){
                    resolve(docs[0]);
                } else {
                    reject(new Error(`The document wuth id: ${id} doesn't exist`));
                }
            }).catch((error)=>{
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};
