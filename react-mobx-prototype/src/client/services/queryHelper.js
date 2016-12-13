import 'whatwg-fetch';

export const queryHelper = (url) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(url).then((response)=>{
                return response.json();
            }).then((data) =>{
                resolve(data);
            }).catch((error)=>{
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};
