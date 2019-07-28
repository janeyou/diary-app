import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../../styles/navigationStyles';
import PostForm from './PostForm';

class EditPost extends Component {
  static navigationOptions = {
    title: 'Edit Post',
    ...navStyles
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  editPost = ({ title, body }) => {
    const { editPost, navigation, screenProps } = this.props;
    this.setState({ loading: true });
    editPost({
      variables: {
        id: this.props.Post.id,
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
          <PostForm onSubmit={this.editPost} post={this.props.Post} />
        )}
      </View>
    );
  }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
    }
  }
`;

const editPost = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String, $userId: ID!) {
    updatePost(id: $id, title: $title, body: $body, userId: $userId) {
      id
    }
  }
`;

export default compose(
  graphql(editPost, {
    name: 'editPost',
    options: {
      refetchQueries: ['Post']
    }
  }),
  graphql(postQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
      variables: {
        id: navigation.state.params.id
      }
    })
  })
)(EditPost);
