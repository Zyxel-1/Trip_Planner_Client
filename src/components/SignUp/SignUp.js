import React, {Component} from 'react';
class SignUp extends Component {
  render(){
    return (
      <div>
        <p>This is the SignUp component</p>
        <p>Email</p>
        <input type="text" id="name" name="name" required
       minlength="4" maxlength="8" size="10"></input>
       <p>Password</p>
       <input type="text" id="name" name="name" required
       minlength="4" maxlength="8" size="10"></input>
        <button type="button">Sign Up</button>
      </div>
      );
  }
}

export default SignUp;