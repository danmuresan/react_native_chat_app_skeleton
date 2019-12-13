import ChatDetailsView from '../components/ChatDetailsView';
import { createStackNavigator } from 'react-navigation-stack';
import SimpleChatList from '../components/SimpleChatList';

const ChatTabNavigator = createStackNavigator({
  ChatList: {
    screen: SimpleChatList
  },
  ChatDetails: {
    screen: ChatDetailsView
  }
});

export default ChatTabNavigator