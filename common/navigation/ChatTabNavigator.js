import ChatDetailsView from '../components/ChatDetailsView';
import { createStackNavigator } from 'react-navigation-stack';
import SimpleChatList from '../components/SimpleChatList';

const ChatTabNavigator = createStackNavigator({
  ChatList: {
    screen: SimpleChatList
  },
  ChatDetails: {
    screen: ChatDetailsView,
    navigationOptions: {
      headerTitle: 'Chat Details'
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