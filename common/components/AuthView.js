import React, { Component } from 'react'
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native'
import timeout from '../utils/AsyncUtils';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isLoading: true
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.base}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={styles.base}>
        <Button
          title='Login'
          onPress={this.onLogin}/>
      </View>
    );
  }

  async onLogin() {
    if (await this.loginAsync()) {
        this.props.navigation.navigate('SimpleChatList');
    } else {
        // TODO: prompt error
    }
  }

  async loginAsync() {
    // TODO: should go through Login API service
    await timeout(1000);
    this.state.isLoading = false;
    this.setState(state);
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