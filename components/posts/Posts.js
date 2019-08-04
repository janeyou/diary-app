import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
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
