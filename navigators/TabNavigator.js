import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import Post from '../components/posts/Post';
import NewPost from '../components/posts/NewPost';
import EditPost from '../components/posts/EditPost';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Post: {
      screen: Post
    },
    NewPost: {
      screen: NewPost
    },
    EditPost: {
      screen: EditPost
    }
  },
  {
    mode: 'modal'
  }
);

const DiariesStack = createStackNavigator({
  Diaries: Post
});

const StreakStack = createStackNavigator({
  Streak: Post
});

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  DiariesStack,
  StreakStack
});

export default TabNavigator;
