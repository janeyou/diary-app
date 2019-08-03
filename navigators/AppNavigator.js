import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { withApollo, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Login from '../components/user/Login';
import TabNavigator from './TabNavigator';

const AppNavigator = createAppContainer(withApollo(TabNavigator));

const userQuery = gql`
  query userQuery {
    user {
      id
      email
      firstName
      posts(orderBy: createdAt_DESC) {
        id
        title
        createdAt
      }
    }
  }
`;

const NavWrapper = () => (
  <Query query={userQuery}>
    {({ loading, data: { user } }) =>
      loading ? (
        <ActivityIndicator size="large" />
      ) : !user ? (
        <Login />
      ) : (
        <AppNavigator screenProps={{ user }} />
      )
    }
  </Query>
);

export default NavWrapper;
