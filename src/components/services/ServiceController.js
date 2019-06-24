import {urlApi} from './config'
class ServiceController {    
    token="";
    init ={
        method: '', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {                        
            //'Access-Control-Allow-Origin': '*',            
            //'Access-Control-Allow-Credentials': true,
            //'origin': 'http://localhost:3000/',            
            'Content-Type': 'application/json',            
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiRWR3aW4gQWNvc3RhIiwidXNlcm5hbWUiOiJhY29zdGFEZWZhdWx0IiwiZW1haWwiOiJlZHdpbjAwMDAwQGhvdG1haWwuY29tIiwiY3JlYXRlZF9hdCI6MTU2MTE3MjAwMCwidXBkYXRlZF9hdCI6MTU2MTE3MjAwMCwidGltZSI6MTU2MTE3MjAwMH0.GYBHpFRzbJbsB8zk5OGJ2DiSoVohM5Jja_hFj0p05sc'        
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: null, // body data type must match "Content-Type" header
    };
    
    

    async getApiKey(){   
        this.init.method="POST";
        this.init.body=JSON.stringify({username:"acostaDefault",password:"acosta1234"});               
        const response =await fetch(urlApi+"User/login",this.init);        
        console.log("status: "+response.status);        
        const json = await response.json();        
        if(json.status)
            this.init.headers.Authorization=json.data.token;
        else
            console.log("Error: "+json.message);        
    }
    
    async sendGet(methodEndPoint){            
        this.init.method="GET";                        
        this.init.body=null;
        const response =await fetch(urlApi+methodEndPoint,this.init);        
        const json = await response.json();        
        if(json.status){
            return json.data;
        }else{
            console.log("Error: "+json.message);
            if(json.message==="Token Time Expire."){                
                console.log("Se consulta el token de nuevo.");      
                await this.getApiKey();                          
                this.init.method="GET";                        
                this.init.body=null;                                
                const response =await fetch(urlApi+methodEndPoint,this.init);                
                const json = await response.json();                
                if(json.status){
                    return json.data;
                }else{
                    console.log("Error 2: "+json.message);
                }
            }
        }
        return null;        
    }

    async sendPost(methodEndPoint,requestData){            
        this.init.method="POST";                        
        this.init.body=JSON.stringify(requestData);
        const response =await fetch(urlApi+methodEndPoint,this.init);                
        const json = await response.json();        
        if(json.status){            
            return json;
        }else{            
            if(json.message==="Token Time Expire."){                
                console.log("Se consulta el token de nuevo.");      
                await this.getApiKey();                          
                this.init.method="POST";                        
                this.init.body=JSON.stringify(requestData);
                const response =await fetch(urlApi+methodEndPoint,this.init);                
                const json = await response.json();                
                if(json.status){
                    return json;
                }else{
                    console.log("Error 2: "+json.message);
                }
            }
        }
        return null;        
    }

    async sendDelete(methodEndPoint){            
        this.init.method="DELETE";                        
        this.init.body=null;
        console.log(urlApi+methodEndPoint);
        const response =await fetch(urlApi+methodEndPoint,this.init);
        console.log("response: "+JSON.stringify(response));
        const json = await response.json();        
        console.log("json: "+JSON.stringify(json));
        if(json.status){            
            return json;
        }else{            
            if(json.message==="Token Time Expire."){                
                console.log("Se consulta el token de nuevo.");      
                await this.getApiKey();                          
                this.init.method="DELETE";                        
                this.init.body=null;
                const response =await fetch(urlApi+methodEndPoint,this.init);
                const json = await response.json();                
                if(json.status){
                    return json;
                }else{
                    console.log("Error 2: "+json.message);
                }
            }
        }
        return null;        
    }

}

export default ServiceController;