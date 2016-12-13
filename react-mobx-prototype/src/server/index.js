import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import compression from 'compression';

import {getCustomersHandler} from "./middleware";
import {getCustomerByIdHandler} from "./middleware";

import {closeDb} from "./dataservices/dbpromise";

//(()=>{
//    let docs1 = getDocuments(`customers`, {Name: /^ł/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1}); 
//    let docs2 = getDocuments(`customers`, {Name: /^ż/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1});
//
//    Promise.all([docs1, docs2])
//    .then((dataa) => {
//        console.log(`Got Data`);
//
//        dataa.forEach((data)=>{
//            data.forEach((element) => {
//                console.log(element);
//            });
//        });
//        return getDocumentById(`customers`,`58482575fc13ae13f9000256`);
//    }).then((doc)=>{
//        console.log(doc);
//    }).then(()=>{
//        closeDb();
//    }).catch((error) => {
//        console.log(`Error`);
//        console.log(error);
//        closeDb();
//    });
//})();


let app = express();
app.use(morgan(`combined`));

// Define the port to run on
app.set(`port`, 80);
app.set(`ip`, `0.0.0.0`);

// define static paths
let staticDir = path.join(process.cwd(), `build/client`);
console.log(`Static dir is: ${staticDir}`);
app.use(`/`, helmet());
app.use(`/`, compression({
  level: 9
}));
app.use(`/`, express.static(staticDir));

// define /api API
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(`/api`, helmet({
  noCache: true
}));
app.use(`/api`, compression({
  level: 6
}));
app.use(`/api`, bodyParser.urlencoded({
  extended: true
}));
app.use(`/api`, bodyParser.json());

app.get(`/api/mycustomers`, getCustomersHandler);
app.get(`/api/mycustomers/:id`, getCustomerByIdHandler);

// Listen for requests
var server = app.listen(app.get(`port`), app.get(`ip`), function () {
  var port = server.address().port;
  console.log(`Listening on port ` + port);
});