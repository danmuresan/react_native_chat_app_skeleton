/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { getRootNavigator } from './common/navigation/NavigationUtils';
import timeout from './common/utils/AsyncUtils';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      isLoading: true,
      isAuthenticated: false
    };
  }

  async componentDidMount() {
    const isAuthenticated = await this.checkUserAuthenticatedAsync();
    this.setState({ isAuthenticated, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.base}>
          <ActivityIndicator size='small' />
        </View>
      )
    }

    const AppContainer = createAppContainer(getRootNavigator(this.state.isAuthenticated));
    return <AppContainer />;
  }

  async checkUserAuthenticatedAsync() {
    // TODO: via some AuthService go to some API and fetch token
    console.log('Faking auth check...');
    await timeout(500);
    return true;
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})