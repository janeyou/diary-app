import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      bntPressed: false
    };
  }

  submitForm = () => {
    this.setState({ bntPressed: true });
    const { email, password } = this.state;
    this.props.onSubmit({
      email,
      password
    });
  };

  render() {
    return (
      <Container>
        <TextInput
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
        />
        <IconEmail source={require('../../assets/mail-24.png')} />
        <IconPassword source={require('../../assets/padlock-24.png')} />
        <TouchableOpacity onPress={this.submitForm}>
          <ButtonView>
            {this.state.bntPressed ? (
              <ActivityIndicator size="large" />
            ) : (
              <ButtonText>{this.props.type}</ButtonText>
            )}
          </ButtonView>
        </TouchableOpacity>
      </Container>
    );
  }
}

const Container = styled.View``;
const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;
const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  left: 12;
  top: 32;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  left: 16;
  top: 94;
`;
