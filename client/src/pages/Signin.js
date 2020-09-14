import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios'
import API from '../utils/API';
import AlertContainer from '../containers/AlertContainer';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: [],
      notTrue: false,
    };
    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  login() {
    API.login(this.state.username, this.state.password).then((response) => {
      console.log(response);
      if (response.data.message) {
        return this.setState({
          errorMsg: [response.data.message],
        });
      }
      this.props.onLogin(
        response.data.user.local.username,
        response.data.user._id
      );
    });
  }

  handleSubmit(event) {
    console.log('HANDLE SUBMIT');
    this.setState({
      errorMsg: [],
    });

    if (!this.state.username && !this.state.password) {
      return this.setState({
        errorMsg: [['Please enter a username'], ['Please enter a password']],
      });
    } else if (!this.state.username) {
      return this.setState({ errorMsg: ['Please enter a username'] });
    } else if (!this.state.password) {
      return this.setState({ errorMsg: ['Please enter a password'] });
    }

    event.preventDefault();

    this.login();
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className='app-render row'>
          <div className='col-md-6 m-auto'>
            <div className='card card-body'>
              <h1 className='text-center mb-3'>
                <i className='fas fa-sign-in-alt'></i> Login
              </h1>
              <div className='form-group'>
                {!this.state.errorMsg.length < 1 ? (
                  <AlertContainer errors={this.state.errorMsg} />
                ) : null}
                {/* <ErrorList errors={this.state.errorMsg} /> */}
                <br />
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  className='form-control'
                  placeholder='Enter Username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='form-control'
                  placeholder='Enter Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button onClick={this.handleSubmit}>Login</button>
              <p className='lead mt-4'>
                No Account? <a href='/signup'>Register</a>
              </p>
            </div>
          </div>
        </div>
        // <div className="LoginForm">

        // 	<h1>Login form</h1>

        // 	<form>
        // 		<label htmlFor="username">Username: </label>
        // 		<input
        // 			type="text"
        // 			name="username"
        // 			value={this.state.username}
        // 			onChange={this.handleChange}
        // 		/>
        // 		<label htmlFor="password">Password: </label>
        // 		<input
        // 			type="password"
        // 			name="password"
        // 			value={this.state.password}
        // 			onChange={this.handleChange}
        // 		/>
        // 		<button onClick={this.handleSubmit}>Login</button>
        // 	</form>

        // </div>
      );
    }
  }
}

export default LoginForm;
