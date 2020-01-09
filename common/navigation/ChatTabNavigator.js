import ChatDetailsView from '../components/ChatDetailsView';
import { createStackNavigator } from 'react-navigation-stack';
import SimpleChatList from '../components/SimpleChatList';
import ProfileSettingsView from '../components/ProfileSettingsView'
import SettingsView from '../components/SettingsView'
import ConversationView from '../components/ConversationView'

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
  },
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      headerTitle: 'Settings'
    }
  },
  Conversation: {
    screen: ConversationView,
    navigationOptions: {
      headerTitle: 'Chat History'
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