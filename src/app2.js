import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
//import UserController from './components/services/UserController';
import ServiceController from './components/services/ServiceController';


class App extends Component{ 
  temp=new ServiceController();                
  constructor(){
    super();
    this.state={
        list:null
    };        
  }  
  
  async componentDidMount(){       
    console.log("componentDidMount App");
        
    const data = await this.temp.sendGet("Test/data");    
    console.log("data: "+data);
    

    /*
   const DigestFetch = require('digest-fetch')
   const digestOptions = {
     cnonceSize: 32,  // length of cnonce, default: 32
     logger: console, // logger for debug, default: none
     algorithm: 'MD5' // only 'MD5' is supported now
   }
   
   const client = new DigestFetch('admin', '1234', digestOptions) 
   console.log("client: "+JSON.stringify(client));
   // do request same way as fetch or node-fetch
   const url = 'http://localhost/rest/index.php/api/Example/users'
   const init ={
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {                                
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',                                
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: null, // body data type must match "Content-Type" header
};
console.log(init);
   client.fetch(url,init)
     .then(resp=>resp.json())      
     .then(data=>console.log(data))
     .catch(e=>console.error(e))   
     
     */

  }

  guardaDatos = async () => {        
    console.log("entro");
    //var formData = new FormData();            
    //const data = await this.temp.sendGet("Test/data");    
    //console.log("data: "+data);    
    



  }  
  render(){
    console.log("entro al render...");
    
    let html;
    console.log("list: "+this.state.list);
    if (this.state.list) {
      html = this.state.list.map(item =>          
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.fact}</td>                
            <td><button>Eliminar</button></td>
        </tr>);              
    } else {
      html = <tr><td colSpan="5">Sin datos.</td></tr>
    }
            

    return (
      <div className="App">
        <form id="myForm">
          <table className="miTabla">
            <thead>            
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Fact</th>              
                <th></th>
              </tr>
            </thead>
            <tbody>
              {html}              
              <tr key={100}>
                <td><input type="text" id="nameSave"></input></td>
                <td><input type="text"></input></td>
                <td><input type="text"></input></td>                
                <td><input type="text"></input></td>
                <td><button type="button" onClick={this.guardaDatos}>Guardar</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default App;
