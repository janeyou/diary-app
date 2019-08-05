import React, { Component } from 'react';
import styled from 'styled-components';
import { BlurView } from 'expo-blur';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { withApollo, compose } from 'react-apollo';

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false
    };
  }

  tapBackground = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          />
        </TouchableWithoutFeedback>
        <Modal>
          <Logo source={require('../../assets/logo-xd.png')} />
          <Text>Start writing your own diary.</Text>
          {this.state.register ? (
            <CreateUser {...this.props} />
          ) : (
            <LoginUser {...this.props} />
          )}
          <TouchableOpacity
            onPress={() =>
              this.setState({
                register: !this.state.register
              })
            }
          >
            <Button>
              {this.state.register
                ? 'Already a user? Login here.'
                : 'Not a user yet? Sign Up here.'}
            </Button>
          </TouchableOpacity>
        </Modal>
      </Container>
    );
  }
}

export default withApollo(Login);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 335px;
  height: 400px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 140px;
  text-align: center;
  color: #b8bece;
`;

const Button = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: silver;
  text-decoration: underline;
  text-decoration-color: silver;
`;
