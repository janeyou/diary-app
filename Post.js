import React, { Component } from 'react';
import { View, Text } from 'react-native';
import navStyles from './styles/navigationStyles';

export default class Post extends Component {
  static navigationOptions = {
    title: 'Post',
    ...navStyles
  };

  render() {
    return (
      <View>
        <Text>some text</Text>
      </View>
    );
  }
}
