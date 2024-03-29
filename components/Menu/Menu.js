import React from 'react';
import styled from 'styled-components';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import * as Icon from '@expo/vector-icons';
import { connect } from 'react-redux';

import MenuItem from './MenuItem';
import { signOut } from '../../loginUtils';

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: 'CLOSE_MENU'
      })
  };
}

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;
var cardWidth = screenWidth;
if (screenWidth > 500) {
  cardWidth = 500;
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(screenHeight)
    };
  }

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == 'openMenu') {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }

    if (this.props.action == 'closeMenu') {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  handleMenu = index => {
    if (index === 3) {
      signOut();
      this.props.client.resetStore();
      this.props.closeMenu();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../../assets/background2.jpg')} />
          <Title>Raeya Yotta</Title>
          <Subtitle>Words from my mind</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: 'absolute',
            top: 120,
            left: '50%',
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <CloseView>
            <Icon.Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem icon={item.icon} title={item.title} text={item.text} />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth};
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: 'ios-settings',
    title: 'Account',
    text: 'setttings'
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payments'
  },
  {
    icon: 'ios-compass',
    title: 'New Diary',
    text: 'start writing'
  },
  {
    icon: 'ios-exit',
    title: 'Log out',
    text: 'see you soon!'
  }
];
