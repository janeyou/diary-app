import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Button
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Fab, Icon } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import Post from './components/posts/Post';
import NewPost from './components/posts/NewPost';
import EditPost from './components/posts/EditPost';
import Posts from './components/posts/Posts';
import navStyles from './styles/navigationStyles';

import Login from './components/user/Login';
import { signOut } from './loginUtils';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
  };

  newPost = () => {
    this.props.navigation.navigate('NewPost');
  };

  render() {
    return (
      <View style={styles.container}>
        <Posts {...this.props} />
        <Button
          onPress={() => {
            signOut();
            this.props.client.resetStore();
          }}
          title="Logout"
        />
        <Fab style={styles.newPost} onPress={this.newPost}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  newPost: {
    backgroundColor: '#82D8D8'
  },
  newPostText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

const Navigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: withApollo(Home)
    },
    Post: {
      screen: Post
    },
    NewPost: {
      screen: NewPost
    },
    EditPost: {
      screen: EditPost
    }
  })
);

const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator size="large" />;
  if (!user) return <Login />;
  return <Navigator screenProps={{ user }} />;
};

const userQuery = gql`
  query userQuery {
    user {
      id
      email
      posts(orderBy: createdAt_DESC) {
        id
        title
      }
    }
  }
`;

export default graphql(userQuery, { props: ({ data }) => ({ ...data }) })(
  NavWrapper
);
