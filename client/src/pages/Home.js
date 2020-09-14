// import React from "react";
import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import LocationInput from '../components/LocationInput';
import Button from '../components/Button';
import ChoiceButton from '../components/choiceButton';
// import { PostList, PostListItem } from "../components/PostList";
import { Container, Row, Col } from '../components/Grid';
import API from '../utils/API';

// Can change to stateful component if need be
// function Home() {
//     return (
//         <p>Inside Home Component</p>
//     );
// }

// export default Home;

export default function Home(props) {
  // state = {
  //   // posts: [],
  //   // postSearch: ""
  //   startLocation: ""
  // };

  // handleInputChange = event => {
  //   // Destructure the name and value properties off of event.target
  //   // Update the appropriate state
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   // When the form is submitted, prevent its default behavior, get posts update the posts state
  //   event.preventDefault();

  //   // API.getPosts(this.state.postSearch)
  //   //   .then(res => this.setState({ posts: res.data }))
  //   //   .catch(err => console.log(err));
  // };

  // onClick() {
  //   window.location.href = "/driver";
  // }
  // render() {
  return (
    <div id='home-container'>
      <Jumbotron />
      <Container>
        <Row>
          <Col size='md-12'>
            <form onSubmit={(event) => event.preventDefault()}>
              <LocationInput
                name='startLocation'
                value={props.state.startLocation}
                onChange={props.handleInputChange}
                placeholder='Enter the departure city or use current location'
                useCurrentLocation={props.useCurrentLocation}
              />
            </form>
          </Col>
        </Row>
        <Row>
          <Col size='sm-6'>
            <ChoiceButton
              // onClick={() => window.location.href = "/driver"}
              className='fa fa-car'
              route='/driver'
            ></ChoiceButton>
            <h4 className='driver'>I am a Driver</h4>
          </Col>
          <Col size='sm-6'>
            <ChoiceButton
              // onClick={() => window.location.href = "/rider"}
              className='fa fa-user'
              route={'/rider'}
            ></ChoiceButton>
            <h4 className='rider'>I am a Rider</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
  // }
}
