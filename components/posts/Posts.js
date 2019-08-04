import React, { Component } from 'react';
import { Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import Card from './Card';
import moment from 'moment';
import styled from 'styled-components';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <Container>
        <ScrollView
          horizontal
          style={{ paddingBottom: 30, paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          <CardsContainer>
            {screenProps.user.posts.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('Post', {
                    id: item.id,
                    title: item.title
                  })
                }
              >
                <Card
                  title={item.title}
                  image={require('../../assets/background2.jpg')}
                  createdAt={moment(new Date(item.createdAt)).fromNow()}
                />
              </TouchableOpacity>
            ))}
          </CardsContainer>
        </ScrollView>
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

const Container = styled.View``;

const CardsContainer = styled.View`
  flex-direction: row;
`;
