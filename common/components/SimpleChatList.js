import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, View, Dimensions} from 'react-native'
import { SimpleChatListItem } from './SimpleChatListItem'
import MockService from '../services/MockService'
import { AppColors } from '../components/ui-helpers/Colors'
import { CommonStyles } from '../components/ui-helpers/CommonStyles'
import { FullScreenLoadingSpinnerView } from '../components/base/FullScreenLoadingSpinnerView'
import { CommonHeaderView } from './base/CommonHeaderView';
import getLocalizedString from './ui-helpers/strings/StringLocalizer'

export default class SimpleChatList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chatListData: []
        };

        this._onFilterContacts = this._onFilterContacts.bind(this);
    }

    async componentDidMount() {
        console.log('Loading up chat list data...')
        await this._loadDataAsync()
        this.setState(this.state);
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <FullScreenLoadingSpinnerView />
            )
        }

        if (this.state.chatListData === undefined || this.state.chatListData.length === 0) {
            return (
                <View style={CommonStyles.base}>
                    <CommonHeaderView 
                        navigation={this.props.navigation}
                        pageTitle={getLocalizedString('ChatsTabTitle')}
                        onSearchComplete={this._onFilterContacts} />
                    <Text style={CommonStyles.centerVerticalHorizontalText}>
                        It looks like your contacts list is empty...
                    </Text>
                </View>
            )
        }
        console.log('Preparing to render chat list');
        return (
            <View style={CommonStyles.base}>
                <CommonHeaderView 
                    navigation={this.props.navigation}
                    pageTitle={getLocalizedString('ChatsTabTitle')}
                    onSearchComplete={this._onFilterContacts} />
                <FlatList
                    ItemSeparatorComponent={this._renderListItemSeparator}
                    style={styles.list}
                    data={this.state.chatListData}
                    keyExtractor={(item) => { return item.id; }}
                    renderItem={({ item }) => {
                        return (
                            <SimpleChatListItem 
                                id={item.id} 
                                avatarUri={item.imageUri} 
                                contactName={item.name} 
                                navigation={this.props.navigation}/>
                        )
                }}/>
            </View>
        )
    }

    _renderListItemSeparator = () => {
        return (
            <View
              style={styles.listItemSeparator}
            />
          );
    };

    _onFilterContacts(searchPhrase) {
        if (searchPhrase === undefined || searchPhrase === '' &&
            this.state.chatListData !== this.originalChatListData) {
            console.log('Clearing out search...');
            this.state.chatListData = this.originalChatListData;
        } else {
            console.log('Attempting to filter contacts for search phrase: ' + searchPhrase);
            this.state.chatListData = this.originalChatListData
                                          .filter(item => item.name.toLowerCase() === searchPhrase.toLowerCase() ||
                                                  item.name.toLowerCase().includes(searchPhrase.toLowerCase()));
        }
        
        this.setState(this.state);
    }

    async _loadDataAsync() {
        this.originalChatListData = await MockService.fetchContactListAsync();
        this.state.chatListData = this.originalChatListData;
        this.state.isLoading = false;
        console.log('Chat list data loaded ' + this.state.chatListData);
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    listItemSeparator: {
        height: 1,
        width: "80%",
        backgroundColor: AppColors.separatorListItemDefault,
        marginLeft: "21%"
    }
})