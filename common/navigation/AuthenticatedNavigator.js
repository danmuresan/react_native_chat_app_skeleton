import { createBottomTabNavigator } from 'react-navigation-tabs'
import CallList from '../components/CallListView'
import SimpleChatList from '../components/SimpleChatList';

const AuthenticatedNavigator = createBottomTabNavigator({
  ChatList: {
    screen: SimpleChatList
  },
  CallList: {
    screen: CallList
  }
});

export default AuthenticatedNavigator