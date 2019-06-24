import {urlApi} from './config'
class UserController{
    static init ={
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',            
            //'Access-Control-Allow-Credentials': true,
            'origin': 'http://localhost:3000/',
            
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        //body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    static async getUsers() {                 
        const response =await fetch(urlApi+"Example/users",this.init);
        const json = await response.json();
        return json;
        
       /*
        return fetch(urlApi+"Example/users",this.init).then(function(response) {            
            return response.json();
        });
        */
        
    }  
}

export default UserController;