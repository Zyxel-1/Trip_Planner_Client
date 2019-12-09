import React, {Component} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axios from "axios";
import './Authentication.css';
class Authentication extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      errorMessage: '',
      errorOccurred: false
    }
  }
  toggleSpinner = () =>{
    this.setState(prevState=>({
      loading: !prevState.loading
    }))
  }
  signUpHandler = (e) =>{
    e.preventDefault();

    const {email, password} = this.state;
    const data = {
      email,password
    }
    this.setState({errorMessage: ''})
    this.setState({errorOccurred: false})
    this.toggleSpinner();
    const URL = process.env.REACT_APP_URL;
     axios
     .post(`${URL}/api/user`,data)
     .then(response =>{
      this.toggleSpinner();
       console.log('Successfully registered. Redirecting to homepage...')
       localStorage.setItem('app-token',response.data.token);
       this.props.history.push('/home');
     })
     .catch(error=>{
      this.toggleSpinner();
      this.setState({errorOccurred: true})
       try{
         if(!error.status){
           console.log(error)
           console.error('A network error has occured.');
           this.setState({errorMessage: 'A network error has occurred.'})
         }else if(error.response.status === 400){
           console.error('Bad Request');
           this.setState({errorMessage: error.message})
         }else if(error.response.status === 500){
           console.error('An error has occurred on the server.');
           this.setState({errorMessage: 'An issues has occured in the server.'})
         }
       }catch(ex){
         Promise.reject(ex);
       }
     })
  }

  loginHandler = (e) =>{
    e.preventDefault();

    const {email, password} = this.state;
    const data = {
      email,password
    }
    const URL = process.env.REACT_APP_URL;
     axios
     .put(`${URL}/api/user`,data)
     .then(response =>{
       console.log('Successfully logged in. Redirecting to homepage...')
       localStorage.setItem('app-token',response.data.token);
       this.props.history.push('/home');
     })
     .catch(error=>{
       try{
         console.log(`Error: ${error.message}`)
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
  }

  render(){
    const {email,password} = this.state;
    return (
      <div>
        <div className="box">
            <Spinner show={this.state.loading}/>
          <form>
            <div>
              <h1>Trip Planner</h1>
              <input type="email" name="email" value={email} className="email" placeholder="Email"  onChange={event => this.setState({ email: event.target.value })} />
              <input type="password" name="email" value={password} className="email" placeholder="Password" onChange={event => this.setState({ password: event.target.value })}/>
              <button className="btn" onClick={this.signUpHandler}>SignUp</button>
              <button className="btn2" onClick={this.loginHandler}>Login</button>
            </div>
          </form>
          </div>
          {this.state.errorOccurred? <div><p>{this.state.errorMessage}</p></div>: null}
      </div>)
  }
}

export default Authentication;