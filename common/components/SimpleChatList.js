import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, View, Dimensions} from 'react-native'
import { SimpleChatListItem } from './SimpleChatListItem'
import timeout from '../utils/AsyncUtils'
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

        this.onFilterContacts = this.onFilterContacts.bind(this);
    }

    async componentDidMount() {
        console.log('Loading up chat list data...')
        await this.loadDataAsync()
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
                        onSearchComplete={this.onFilterContacts} />
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
                    onSearchComplete={this.onFilterContacts} />
                <FlatList
                    ItemSeparatorComponent={this.renderListItemSeparator}
                    style={styles.list}
                    data={this.state.chatListData}
                    keyExtractor={(item) => { return item.id; }}
                    renderItem={({ item }) => {
                        console.log(item);
                        return (
                            <SimpleChatListItem id={item.id} avatarUri={item.imageUri} contactName={item.name} navigation={this.props.navigation}/>
                        )
                }}/>
            </View>
        )
    }

    renderListItemSeparator = () => {
        return (
            <View
              style={styles.listItemSeparator}
            />
          );
    };

    onFilterContacts(searchPhrase) {
        if (searchPhrase === undefined || searchPhrase === '' &&
            this.state.chatListData !== this.originalChatListData) {
            console.log('Clearing out search...');
            this.state.chatListData = this.originalChatListData;
        } else {
            console.log('Attempting to filter contacts for search phrase: ' + searchPhrase);
            this.state.chatListData = this.originalChatListData
                                          .filter(item => item.name.toLowerCase() === searchPhrase.toLowerCase() ||
                                                  item.name.toLowerCase().includes(searchPhrase.toLowerCase()));
            console.log("NEW LIST SIZE " + this.state.chatListData.length);
        }
        
        this.setState(this.state);
    }

    async loadDataAsync() {
        // TODO: load up from somewhere
        await timeout(500);
        this.originalChatListData = [
            {id: 1, name: 'Ansu', imageUri: 'https://www.fcbarcelonanoticias.com/uploads/s1/11/67/29/2/ansu-fati-bakero.jpeg'},
            {id: 2, name: 'Carlos', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/10/23/ecde1c7a-c3c9-4e7f-b652-b747a870f697/C-PEREZ_players_BARCA_B.jpg?width=1200&height=750'},
            {id: 3, name: 'Antoine', imageUri: 'https://e0.365dm.com/19/12/768x432/skysports-antoine-griezmann_4856510.jpg?20191204155640'},
            {id: 4, name: 'Johhny El Diablo', imageUri: 'https://pbs.twimg.com/profile_images/1198234817273454592/81t8iNr8_400x400.jpg'},
            {id: 5, name: 'Lionel', imageUri: 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Barcelona-star-Lionel-Messi-scored-a-hat-trick-against-RCD-Mallorca-1214446.jpg'},
            {id: 6, name: 'Luis', imageUri: 'https://as01.epimg.net/futbol/imagenes/2019/11/09/primera/1573292347_445203_1573292490_noticia_normal_recorte1.jpg'},
            {id: 7, name: 'Marc', imageUri: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fc-barcelona-v-internazionale-uefa-champions-league-5d9cfaed00a54e0b7b000010.jpg'},
            {id: 8, name: 'Sergio', imageUri: 'https://resources.premierleague.com/photos/2019/11/20/a5b52b88-774c-4181-b869-8320e43d9b1e/Sergio-Aguero-2.jpg?width=930&height=620'},
            {id: 9, name: 'Ivan', imageUri: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/12/12/15761657836711.jpg'},
            {id: 10, name: 'Frankie', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/07/02/aa0a923b-e8d4-4eef-8319-81c71656b367/Fitxatges_DE_JONG_3200x2000_B.JPG?width=1200&height=750'},
            {id: 11, name: 'Clement', imageUri: 'https://www.fifaultimateteam.it/en/wp-content/uploads/2019/06/clement-lenglet.jpg'}
        ];

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