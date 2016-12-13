import {
    getDocumentById
} from '../dataservices/queryservice';

export const getCustomerByIdHandler = (req, res) => {
    try {
        let customerId = req.params.id;
        console.log(`Id is: ${customerId}`);

        getDocumentById(`customers`, customerId)
            .then((data) => {
                res.json(data);
            }).catch((error) => {
                res.status(500).send(`Internal Server Error: ${error}`); //500 Internal Server Error
            });
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`); //500 Internal Server Error
    }
};
