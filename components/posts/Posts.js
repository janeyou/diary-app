import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading, allPosts, navigation } = this.props;
    if (loading) return null;
    return (
      <View>
        <FlatList
          data={allPosts}
          renderItem={({ item }) => (
            <Text
              onPress={() =>
                navigation.navigate('Post', {
                  id: item.id
                })
              }
            >
              {item.title}
            </Text>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const postsQuery = gql`
  {
    allPosts {
      id
      title
    }
  }
`;

export default graphql(postsQuery, {
  props: ({ data }) => ({ ...data })
})(Posts);
