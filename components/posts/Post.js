import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';
import * as Icon from '@expo/vector-icons';

import navStyles from '../../styles/navigationStyles';

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
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

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { loading, Post } = this.props;
    if (loading) return <ActivityIndicator size="large" />;
    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={require('../../assets/background2.jpg')} />
          <Title>{Post.title}</Title>
          <Time>{moment(new Date(Post.createdAt)).fromNow()}</Time>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseView>
            <Icon.Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Button title="Close" />

        <TouchableOpacity
          onPress={this.editPost}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10
          }}
        >
          <CreateBtn>
            <Icon.Ionicons name="ios-create" size={44} color="white" />
          </CreateBtn>
        </TouchableOpacity>
      </Container>
    );
  }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
      createdAt
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

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Time = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const CreateBtn = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #82d8d8;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
