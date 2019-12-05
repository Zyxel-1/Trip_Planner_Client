import React, {Component} from 'react';
import axios from "axios";
import './Authentication.css';
class Authentication extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  signUpHandler = () =>{
    const {email, password} = this.state;
    const data = {
      email,password
    }
    console.log(`Sending this to backend ${email} and ${password}`)
    /*
     axios
     .post(`URL`,data)
     .then(response =>{
       localStorage.setItem('app-token',response.data.token);
     })
     .catch(error=>{
       try{
         if(!error.status){
           console.error('A network error has occured.');
         }else if(error.response.status === 400){
           console.error('Bad Request');
         }else if(error.response.status === 500){
           console.error('An error has occurred on the server.');
         }
       }catch(ex){
         Promise.reject(ex);
       }
     })
     */
  }

  loginHandler = () =>{
    console.log("Login");
  }

  render(){
    const {email,password} = this.state;
    return (
      <div className="box">
      <form>
        <div>
          <h1>Trip Planner</h1>
          <input type="email" name="email" value={email} className="email" placeholder="Email"  onChange={event => this.setState({ email: event.target.value })} />
          <input type="password" name="email" value={password} className="email" placeholder="Password" onChange={event => this.setState({ password: event.target.value })}/>
          <button className="btn" onClick={this.signUpHandler}>SignUp</button>
          <button className="btn2" onClick={this.loginHandler}>Login</button>
        </div>
      </form>
      </div>);
  }
}

export default Authentication;