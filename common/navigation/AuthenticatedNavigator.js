import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'react-native-elements'
import CallList from '../components/CallListView'
import SimpleChatList from '../components/SimpleChatList';
import { AppColors } from '../components/ui-helpers/Colors'

const AuthenticatedNavigator = createBottomTabNavigator({
  ChatList: {
    screen: SimpleChatList,
    navigationOptions: {
      tabBarLabel: "Chats",
      tabBarIcon: ({tintColor}) => (<Icon name='chat' color={tintColor}/>),
      tabBarOptions: {
        activeTintColor: AppColors.appBrand,
        tintColor: AppColors.bottomBarPrimary
      }
    }
  },
  CallList: {
    screen: CallList,
    navigationOptions: {
      tabBarLabel: "Calls",
      tabBarIcon: ({tintColor}) => (<Icon name='call' color={tintColor}/>),
      tabBarOptions: {
        activeTintColor:AppColors.appBrand,
        tintColor: AppColors.bottomBarPrimary
      }
    }
  }
});

export default AuthenticatedNavigator