import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from './styles/navigationStyles';

class Post extends Component {
  static navigationOptions = {
    title: 'Post',
    ...navStyles
  };

  render() {
    const { loading, Post } = this.props;
    if (loading) return null;
    return (
      <View>
        <Text>{Post.title}</Text>
      </View>
    );
  }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
    }
  }
`;

export default graphql(postQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Post);
