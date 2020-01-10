/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { NativeModules, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { getRootNavigator } from './common/navigation/NavigationUtils';
import MockService from './common/services/MockService'
import { FullScreenLoadingSpinnerView } from './common/components/base/FullScreenLoadingSpinnerView';
import AppSessionCache from './common/utils/AppSessionCache'
import { AppConstants } from './common/utils/AppConstants'

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
    // TODO: parallelize
    console.log('App booting up, preparing to check user authentication...')
    const isAuthenticated = await MockService.checkUserAuthenticatedAsync();
    this.getAndCacheCurrentLocale();
    this.setState({ isAuthenticated, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <FullScreenLoadingSpinnerView />
      )
    }

    const AppContainer = createAppContainer(getRootNavigator(this.state.isAuthenticated));
    return <AppContainer />;
  }

  getAndCacheCurrentLocale() {
    try {
      const currentlyCachedLocale = AppSessionCache.getItem(AppConstants.CurrentLocaleCacheItemKey);
      if (currentlyCachedLocale === undefined || currentlyCachedLocale === '') {
        let locale = '';
        console.log('No cached locale yet...');
        // TODO: either determine if locale changed or refetch locale on every app start!!
        const computeLocaleFunc = Platform.select({
          ios: () => locale = NativeModules.SettingsManager.settings.AppleLocale, // "fr_FR"
          android: () => locale = NativeModules.I18nManager.localeIdentifier    // "fr_FR"
        });
            
        computeLocaleFunc();
        locale = locale.split('_')[0].toLowerCase();
        console.log('Current locale: ' + locale);

        if (locale !== undefined && locale !== '') {
          console.log('Caching new locale (' + locale + ')...');
          AppSessionCache.setItem(AppConstants.CurrentLocaleCacheItemKey, locale);
          return locale;
        } else {
          return undefined;
        }
      }
    } catch(error) {
      console.log("Something went wrong when trying to fetch the locale: " + error)
      return undefined;
    }
  }
}