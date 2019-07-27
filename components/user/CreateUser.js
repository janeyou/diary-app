import React, { Component } from 'react';
import { View, Text } from 'react-native';

import UserForm from './UserForm';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createUser = () => {};

  render() {
    return (
      <View>
        <Text>Register</Text>
        <UserForm onSubmit={this.createUser} type="Register" />
      </View>
    );
  }
}
