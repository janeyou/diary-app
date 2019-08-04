import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import moment from 'moment';

export default class DiaryScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, screenProps } = this.props;
    console.log(screenProps.user.posts);
    return (
      <Container>
        <List>
          <FlatList
            style={{ paddingLeft: 10 }}
            data={screenProps.user.posts}
            renderItem={({ item }) => (
              <ListItem
                icon
                onPress={() =>
                  navigation.navigate('Post', {
                    id: item.id,
                    title: item.title
                  })
                }
              >
                <Body>
                  <Text>{item.title}</Text>
                </Body>
                <Right>
                  <Text>{moment(new Date(item.createdAt)).fromNow()}</Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </List>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
  margin-left: 10px;
`;

const Text = styled.Text``;
