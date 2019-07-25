import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { ApolloClinet } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Post from './Post';
import navStyles from './styles/navigationStyles';

const client = new ApolloClinet({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjyf1t2p00gn90109g4v848l7'
  }),
  cache: new InMemoryCache()
});

class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
  };

  goToPost = () => {
    this.props.navigation.navigate('Post');
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>Hello!</Text>
          <Button onPress={this.goToPost} title="Go to post page" />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Post: {
    screen: Post
  }
});

export default createAppContainer(AppNavigator);
