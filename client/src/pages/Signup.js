import React, { Component } from "react";
import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import API from '../utils/API';
import AlertContainer from "../containers/AlertContainer"



// Can change to stateful component if need be
class Signup extends Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			errorMsg: []
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleSubmit(event) {
		event.preventDefault()
		console.log('STATE:')
		console.log(this.state)
		console.log('================================================')
		//TO DO
		//Add conditional to check if username already exists
		if (!this.state.password || !this.state.confirmPassword || !this.state.username || !this.state.firstName || !this.state.lastName || !this.state.email) {
			return this.setState({
				errorMsg: ["Please fill out all the required fields"]
			})

		} else if (this.state.confirmPassword !== this.state.password) {
			return this.setState({
				errorMsg: ["Passwords do not match"]
			})

		} else {

			axios.post('/auth/signup', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			}).then(response => {
					if (!response.data.error) {
						console.log('Registration succesful');
						API.login(this.state.username, this.state.password)
						.then(response => {
							
							console.log("USER")
							console.log(response.data.user)

							if (response.data.message) {
								return this.setState({
									errorMsg: [response.data.message]
								})
							}
							this.props.onLogin(response.data.user.local.username, response.data.user._id);
						})
					} else {
						console.log('duplicate')
						console.log(response.data.error)
						this.setState({
							errorMsg: [response.data.error]
						})
					}
				})
		}
	}
	render() {
		return (
			<div class="row mt-5">
				<div class="col-md-6 m-auto">
					<div class="card card-body">
						<h1 class="text-center mb-3">
						<i class="fas fa-user-plus"></i> Register
						</h1>
						<div class="form-group">
							{(!this.state.errorMsg.length < 1 ?
								<AlertContainer errors={this.state.errorMsg} />
								: null
							)}


							{/* {(this.state.errorMsg ? this.state.errorMsg : null )} */}
							<br />

						<div class="form-group">
							<label for="firstName">First Name</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								class="form-control"
								placeholder="Enter First Name"
								value={this.state.firstName}
								onChange={this.handleChange}
							/>
						</div>

						<div class="form-group">
							<label for="lastName">Surname</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								class="form-control"
								placeholder="Enter Last Name"
								value={this.state.lastName}
								onChange={this.handleChange}
							/>
						</div>

						<div class="form-group">
							<label for="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								class="form-control"
								placeholder="Enter Your Email "
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>

						<label for="name">Username</label>
							<input
								type="text"
								id="name"
								name="username"
								class="form-control"
								placeholder="Enter Username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</div>

						<div class="form-group">
							<label for="password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								class="form-control"
								placeholder="Create Password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
						<div class="form-group">
							<label for="password2">Confirm Password</label>
							<input
								type="password"
								id="password2"
								name="confirmPassword"
								class="form-control"
								placeholder="Confirm Password"
								value={this.state.confirmPassword}
								onChange={this.handleChange}
							/>
						</div>
						<button onClick={this.handleSubmit}>Sign up</button>
						<p class="lead mt-4">Have An Account? <a href="/signin">Login</a></p>
					</div>
				</div>
			</div>
		)
	}
}



export default Signup;