import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../../styles/navigationStyles';
import PostForm from './PostForm';

class NewPost extends Component {
  static navigationOptions = {
    title: 'New Post',
    ...navStyles
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  newPost = ({ title, body }) => {
    const { newPost, navigation, screenProps } = this.props;
    this.setState({ loading: true });
    newPost({
      variables: {
        title,
        body,
        userId: screenProps.user.id
      }
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PostForm onSubmit={this.newPost} />
        )}
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $body: String, $userId: ID!) {
    createPost(title: $title, body: $body, userId: $userId) {
      id
    }
  }
`;

export default graphql(newPost, {
  name: 'newPost',
  options: {
    refetchQueries: ['userQuery']
  }
})(NewPost);
