import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import * as Icon from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Post from '../components/posts/Post';
import NewPost from '../components/posts/NewPost';
import EditPost from '../components/posts/EditPost';
import DiaryScreen from '../screens/DiaryScreen';
import StreakScreen from '../screens/StreakScreen';

const activeColor = '#4775f2';
const inactiveColor = '#b8bece';

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

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;

  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'Home') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const DiaryStack = createStackNavigator({
  Diary: {
    screen: DiaryScreen
  }
});

DiaryStack.navigationOptions = {
  tabBarLabel: 'Diary',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const StreakStack = createStackNavigator({
  Streak: {
    screen: StreakScreen
  }
});

StreakStack.navigationOptions = {
  tabBarLabel: 'Streak',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-calendar"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  DiaryStack,
  StreakStack
});

export default TabNavigator;
