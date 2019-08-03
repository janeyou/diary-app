import React from 'react';
import {
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import styled from 'styled-components';
import * as Icon from '@expo/vector-icons';
import { connect } from 'react-redux';

import Posts from '../components/posts/Posts';
import navStyles from '../styles/navigationStyles';

import { signOut } from '../loginUtils';
import Menu from '../components/Menu/Menu';
import Avatar from '../components/Menu/Avatar';

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPEN_MENU'
      })
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
    ...navStyles
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == 'openMenu') {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle('light-content', true);
    }
    if (this.props.action == 'closeMenu') {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
      StatusBar.setBarStyle('dark-content', true);
    }
  };

  newPost = () => {
    this.props.navigation.navigate('NewPost');
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: 'absolute', top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>{this.props.screenProps.user.firstName}</Name>
                <Icon.Ionicons
                  name="ios-notifications"
                  size={32}
                  color="#4775f2"
                  style={{ position: 'absolute', right: 20, top: 5 }}
                />
              </TitleBar>
              <Subtitle>Most recent</Subtitle>
              <Posts {...this.props} />
              <Button
                onPress={() => {
                  signOut();
                  this.props.client.resetStore();
                }}
                title="Logout"
              />
            </ScrollView>
          </SafeAreaView>
          <TouchableOpacity
            onPress={this.newPost}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10
            }}
          >
            <AddButton>
              <Icon.Ionicons name="ios-add" size={44} color="white" />
            </AddButton>
          </TouchableOpacity>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const AddButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #82d8d8;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 50px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
