import { createSwitchNavigator } from 'react-navigation'

import AuthenticationNavigator from './AuthenticationNavigator'
import AuthenticatedNavigator from './AuthenticatedNavigator'

export const getRootNavigator = (loggedIn = false) => createSwitchNavigator(
  {
    NotAuthenticated: {
      screen: AuthenticationNavigator
    },
    Authenticated: {
      screen: AuthenticatedNavigator
    }
  },
  {
    initialRouteName: loggedIn ? 'Authenticated' : 'NotAuthenticated'
  }
)