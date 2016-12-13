import {getDocuments} from '../dataservices/queryservice';

export const getCustomersHandler = (req, res) => {
    try {
        getDocuments(`customers`, undefined, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1}) 
        .then((dataa) => {
            res.json(dataa);
        }).catch((error) => {
            res.json({error});
    });
    } catch (error) {
        res.json({error});
    }
};
