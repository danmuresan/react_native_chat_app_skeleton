import ChatDetailsView from '../components/ChatDetailsView';
import { createStackNavigator } from 'react-navigation-stack';
import SimpleChatList from '../components/SimpleChatList';
import ProfileSettingsView from '../components/ProfileSettingsView'

const ChatTabNavigator = createStackNavigator({
  ChatList: {
    screen: SimpleChatList
  },
  ChatDetails: {
    screen: ChatDetailsView,
    navigationOptions: {
      headerTitle: 'Chat Details'
    }
  },
  Profile: {
    screen: ProfileSettingsView,
    navigationOptions: {
      headerTitle: 'Profile'
    }
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

export default ChatTabNavigator;