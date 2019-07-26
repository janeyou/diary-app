import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import Post from './Post';
import navStyles from './styles/navigationStyles';
import Posts from './Posts';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
  };

  goToPost = () => {
    this.props.navigation.navigate('Post');
  };

  render() {
    return (
      <View style={styles.container}>
        <Posts {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Post: {
    screen: Post
  }
});

export default createAppContainer(AppNavigator);
