import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigators/AppNavigator';
import { getToken } from './loginUtils';

const initialState = {
  action: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU':
      return { ...state, action: 'closeMenu' };
    case 'OPEN_MENU':
      return { ...state, action: 'openMenu' };
    default:
      return state;
  }
};

const store = createStore(reducer);

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjyf1t2p00gn90109g4v848l7'
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ApolloProvider>
    );
  }
}
