import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO - validate!

    axios
      .post('/auth/signup', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log('Succesful ');
          this.setState({
            redirectTo: '/login',
          });
        } else {
          console.log('duplicate');
        }
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div class='row mt-5'>
        <div class='col-md-6 m-auto'>
          <div class='card card-body'>
            <h1 class='text-center mb-3'>
              <i class='fas fa-user-plus'></i> Register
            </h1>
            <form action='/users/register' method='POST'>
              <div class='form-group'>
                <label for='name'>Name</label>
                <input
                  type='text'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              {/* <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="form-control"
                                    placeholder="Enter Email"
                                    value=""
                                />
                            </div> */}
              <div class='form-group'>
                <label for='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div class='form-group'>
                <label for='password2'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <button type='submit' class='btn btn-primary btn-block'>
                {' '}
                Register
              </button>
            </form>
            <p class='lead mt-4'>
              Have An Account? <a href='/users/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
