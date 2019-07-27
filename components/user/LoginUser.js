import React, { Component } from 'react';
import { View, Text } from 'react-native';

import UserForm from './UserForm';

export default class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loginUser = () => {};

  render() {
    return (
      <View>
        <Text>Login</Text>
        <UserForm onSubmit={this.loginUser} type="Login" />
      </View>
    );
  }
}
