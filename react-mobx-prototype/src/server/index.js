import {getDocuments, getDocumentById} from './dataservices/queryservice';
import {closeDb} from "./dataservices/dbpromise";

console.log(`It's alive`);

(()=>{
    let docs1 = getDocuments(`customers`, {Name: /^ł/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1}); 
    let docs2 = getDocuments(`customers`, {Name: /^ż/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1});

    Promise.all([docs1, docs2])
    .then((dataa) => {
        console.log(`Got Data`);

        dataa.forEach((data)=>{
            data.forEach((element) => {
                console.log(element);
            });
        });
        return getDocumentById(`customers`,`58482575fc13ae13f9000256`);
    }).then((doc)=>{
        console.log(doc);
    }).then(()=>{
        closeDb();
    }).catch((error) => {
        console.log(`Error`);
        console.log(error);
        closeDb();
    });
})();

console.log(`It's dead`);
