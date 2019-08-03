import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { List, ListItem, Body, Right, Icon, Item } from 'native-base';
import Card from './Card';
import moment from 'moment';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }

  componentDidMount() {
    fetch(
      'https://www.rescuetime.com/anapi/data?key=B6396Qln0RBqiSENMdfSXWs3XP3HUIrvAdmjMPOt&perspective=interval&restrict_kind=activity&interval=hour&restrict_begin=2019-08-01&restrict_end=2019-08-01&format=json'
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          activities: response.rows
        });
      });
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
            data={this.state.activities}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate('Post', {
                    id: index,
                    title: item[3]
                  })
                }
              >
                <Body>
                  <Text>{item[3]}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            keyExtractor={(item, index) => index}
          />
        </List>
      </View>
    );
  }
}
