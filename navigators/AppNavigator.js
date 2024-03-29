import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Login from '../components/user/Login';
import TabNavigator from './TabNavigator';

const AppNavigator = createAppContainer(TabNavigator);

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
        <LoadingView>
          <ActivityIndicator size="large" />
        </LoadingView>
      ) : !user ? (
        <Login />
      ) : (
        <AppNavigator screenProps={{ user }} />
      )
    }
  </Query>
);

export default NavWrapper;

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
