import React, { Component } from 'react';
import axios from 'axios';

/* Import Components */
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    console.log('Your input value is: ' + JSON.stringify(props));
    this.state = {
      newPost: {
        start_location: '',
        end_location: '',
        leaving_date: '',
        flexible_date: '',
        cost: '',
        seats_available: '',
        smoking: '',
        luggage: '',
        comment: '',
      },

      luggageOpt: ['yes', 'no'],
      flexibleDateOpt: ['yes', 'no'],
      smokingOpt: ['yes', 'no'],
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleStart_location = this.handleStart_location.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleStart_location(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        newPost: {
          ...prevState.newPost,
          start_location: value,
        },
      }),
      () => console.log(this.state.newPost)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        newPost: {
          ...prevState.newPost,
          [name]: value,
        },
      }),
      () => console.log(this.state.newPost)
    );
  }

  handleTextArea(e) {
    console.log('Inside handleTextArea');
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        newPost: {
          ...prevState.newPost,
          comment: value,
        },
      }),
      () => console.log(this.state.newPost)
    );
  }

  handleFormSubmit(e) {
    let postData = this.state.newPost;
    e.preventDefault();

    if (this.props.page === 'DriverPost') {
      postData.driver_id = this.props.userId;
      axios
        .post('/api/drivers', postData)
        .then((response) => console.log(response.data));

      this.setState({
        newPost: {
          driver_id: '',
          driver: true,
          start_location: '',
          end_location: '',
          leaving_date: '',
          flexible_date: '',
          cost: '',
          seats_available: '',
          smoking: '',
          luggage: '',
          comment: '',
        },
      });
    } else if (this.props.page === 'RiderPost') {
      postData.rider_id = this.props.userId;
      axios
        .post('/api/riders', postData)
        .then((response) => console.log(response.data));

      this.setState({
        newPost: {
          rider_id: '',
          driver: false,

          start_location: '',
          end_location: '',
          leaving_date: '',
          flexible_date: '',
          cost: '',
          seats_available: '',
          smoking: '',
          luggage: '',
          comment: '',
        },
      });
    }
  }

  render() {
    return (
      <form className='container-fluid' onSubmit={this.handleFormSubmit}>
        <Input
          inputType={'text'}
          name={'start_location'}
          title={'Start Location'}
          value={this.state.newPost.start_location}
          placeholder={'Enter your start location'}
          handleChange={this.handleStart_location}
        />{' '}
        {/* start_location */}
        <Input
          inputType={'text'}
          name={'end_location'}
          title={'End Location'}
          value={this.state.newPost.end_location}
          placeholder={'Enter your final destination'}
          handleChange={this.handleInput}
        />{' '}
        <Input
          type={'date'}
          name={'leaving_date'}
          title={'Leaving Date'}
          value={this.state.newPost.leaving_date}
          placeholder={'Enter your the leaving date'}
          handleChange={this.handleInput}
        />{' '}
        <Select
          title={'Flexible Date'}
          name={'flexible_date'}
          options={this.state.flexibleDateOpt}
          value={this.state.newPost.flexible_date}
          placeholder={'Select Option'}
          handleChange={this.handleInput}
        />{' '}
        {/* Flexible date Selection */}
        <Input
          inputType={'number'}
          name={'cost'}
          title={'Cost'}
          value={this.state.newPost.cost}
          placeholder={'Enter the cost'}
          handleChange={this.handleInput}
        />{' '}
        <Input
          inputType={'number'}
          name={'seats_available'}
          title={'Seats'}
          value={this.state.newPost.seats_available}
          placeholder={'Enter the number of seats'}
          handleChange={this.handleInput}
        />{' '}
        <Select
          title={'Smoking'}
          name={'smoking'}
          options={this.state.smokingOpt}
          value={this.state.newPost.smoking}
          placeholder={'Select Option'}
          handleChange={this.handleInput}
        />{' '}
        <Select
          name={'luggage'}
          title={'Luggage'}
          value={this.state.newPost.luggage}
          options={this.state.luggageOpt}
          placeholder={'Select Option'}
          handleChange={this.handleInput}
        />{' '}
        <TextArea
          title={'Comments'}
          rows={10}
          value={this.state.newPost.comments}
          name={'currentPetInfo'}
          handleChange={this.handleTextArea}
          placeholder={'Additional comments'}
        />
        {/* comments you */}
        <Button
          action={this.handleFormSubmit}
          type={'primary'}
          title={'Submit'}
          style={buttonStyle}
          text={'Post'}
        />{' '}
        {/*Submit */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

export default FormContainer;
