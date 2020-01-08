import React, { Component } from 'react'
import { View, Button } from 'react-native'
import timeout from '../utils/AsyncUtils';
import { CommonStyles } from '../components/ui-helpers/CommonStyles'
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'

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
        <FullScreenLoadingSpinnerView />
      )
    }

    return (
      <View style={CommonStyles.base}>
        <Button
          title={getLocalizedString('LoginTitle')}
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