import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Fab, Icon } from 'native-base';

import navStyles from '../../styles/navigationStyles';

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      ...navStyles
    };
  };

  editPost = () => {
    const { Post } = this.props;
    this.props.navigation.navigate('EditPost', {
      id: Post.id,
      title: Post.title
    });
  };

  render() {
    const { loading, Post } = this.props;
    if (loading) return <ActivityIndicator size="large" />;
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>{Post.body}</Text>
        <Fab style={styles.editPost} onPress={this.editPost}>
          <Icon name="create" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  editPost: {
    backgroundColor: '#82D8D8'
  },
  bodyText: {
    fontSize: 16
  }
});

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
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
