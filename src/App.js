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
    const list = await this.temp.sendGet("Girl/data");            
    this.setState({list});
  }

  eliminar = async idGirl =>{
    console.log("voy a eliminarte: "+idGirl);
    const res = await this.temp.sendDelete("Girl/data/"+idGirl);
    if(res.status){
      const list = await this.temp.sendGet("Girl/data");            
      this.setState({list});
    }
  }


  guardaDatos = async () => {        
    console.log("guardaDatos");
    const f=document.getElementById("myForm");
    const requestData = {
      id_girl: f.idGirl.value,
      name: f.nameGirl.value,
      last_name: f.lastNameGirl.value,
      age: f.ageGirl.value,
      url_photo: f.photoGirl.value,
    };
    
    const res = await this.temp.sendPost("Girl/data",requestData);
    if(res.status){
      const list = await this.temp.sendGet("Girl/data");            
      this.setState({list});
      f.idGirl.value="";
      f.nameGirl.value="";
      f.lastNameGirl.value="";
      f.ageGirl.value="";
      f.photoGirl.value="";
    }
    
  }  
  render(){
    console.log("entro al render...");
    
    let html;        
    if (this.state.list && this.state.list.length>0) {
      html = this.state.list.map(item =>          
          <tr key={item.id_girl}>
            <td>{item.id_girl}</td>
            <td>{item.name}</td>
            <td>{item.last_name}</td>
            <td>{item.age}</td>                
            <td>{item.url_photo}</td>                
            
            <td><button type="button" onClick={() => this.eliminar(item.id_girl)}>Eliminar</button></td>
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
                <th>Apellido</th>
                <th>Edad</th>
                <th>Photo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {html}              
              <tr key={100}>
                <td><input type="text" name="idGirl"></input></td>
                <td><input type="text" name="nameGirl"></input></td>
                <td><input type="text" name="lastNameGirl"></input></td>
                <td><input type="text" name="ageGirl"></input></td>
                <td><input type="text" name="photoGirl"></input></td>
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
