import React from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import styled from 'styled-components';
import * as Icon from '@expo/vector-icons';

import Post from './components/posts/Post';
import NewPost from './components/posts/NewPost';
import EditPost from './components/posts/EditPost';
import Posts from './components/posts/Posts';
import navStyles from './styles/navigationStyles';

import Login from './components/user/Login';
import { signOut } from './loginUtils';
import Menu from './components/Menu/Menu';

class Home extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
    ...navStyles
  };

  newPost = () => {
    this.props.navigation.navigate('NewPost');
  };

  render() {
    return (
      <Container>
        <Menu />
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <Avatar source={require('./assets/avatar.jpg')} />
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
      </Container>
    );
  }
}

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
`;

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

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

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
      firstName
      posts(orderBy: createdAt_DESC) {
        id
        title
        createdAt
      }
    }
  }
`;

export default graphql(userQuery, { props: ({ data }) => ({ ...data }) })(
  NavWrapper
);
