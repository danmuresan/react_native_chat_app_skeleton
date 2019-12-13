import { createStackNavigator } from 'react-navigation-stack'
import AuthenticationView from '../components/AuthView'

const AuthenticationNavigator = createStackNavigator({
  Login: {
    screen: AuthenticationView
  }//,
  // TODO: add register
});

export default AuthenticationNavigator