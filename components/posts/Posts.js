import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { List, ListItem, Body, Right, Icon, Item } from 'native-base';
import Card from './Card';
import moment from 'moment';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View>
        <ScrollView
          horizontal
          style={{ paddingBottom: 30 }}
          showsHorizontalScrollIndicator={false}
        >
          {screenProps.user.posts.map(item => (
            <Card
              key={item.id}
              title={item.title}
              image={require('../../assets/background2.jpg')}
              createdAt={moment(new Date(item.createdAt)).fromNow()}
            />
          ))}
        </ScrollView>
        <List>
          <FlatList
            data={screenProps.user.posts}
            renderItem={({ item }) => (
              <ListItem
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
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </List>
      </View>
    );
  }
}
