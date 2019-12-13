import React, { Component } from 'react'
import { FlatList, Text, ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native'
import { SimpleChatListItem } from './SimpleChatListItem'
import timeout from '../utils/AsyncUtils'

export default class SimpleChatList extends Component {

    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chatListData: []
        };
    }

    async componentDidMount() {
        console.log('Loading up chat list data...')
        await this.loadDataAsync();
        this.setState(this.state);
    }
    
    render() {
        if (this.state.isLoading) {
            return (
              <View style={styles.base}>
                <ActivityIndicator size='small' />
              </View>
            )
        }

        console.log('Preparing to load up list UI');
        return (
            <View style={{flex: 1}}>
                <Text style={styles.listHeader}>Simple Chat List</Text>
                <FlatList
                 style={styles.list}
                 data={this.state.chatListData}
                 keyExtractor={(item) => { return item.id; }}
                 renderItem={({ item }) => {
                    console.log(item);
                    return (
                        <SimpleChatListItem avatarUri={item.imageUri} contactName={item.name}/>
                    )
                }}/>
            </View>
        )
    }

    async loadDataAsync() {
        // TODO: load up from somewhere
        this.state.isLoading = true;
        await timeout(500);
        this.state.chatListData = [
            {id: 0, name: 'Ansu', imageUri: 'https://www.fcbarcelonanoticias.com/uploads/s1/11/67/29/2/ansu-fati-bakero.jpeg'},
            {id: 1, name: 'Carlos', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/10/23/ecde1c7a-c3c9-4e7f-b652-b747a870f697/C-PEREZ_players_BARCA_B.jpg?width=1200&height=750'},
            {id: 2, name: 'Antoine', imageUri: 'https://e0.365dm.com/19/12/768x432/skysports-antoine-griezmann_4856510.jpg?20191204155640'},
            {id: 3, name: 'Johhny El Diablo', imageUri: 'https://pbs.twimg.com/profile_images/1198234817273454592/81t8iNr8_400x400.jpg'},
            {id: 4, name: 'Lionel', imageUri: 'https://www.fcbarcelonanoticias.com/uploads/s1/11/67/29/2/ansu-fati-bakero.jpeg'},
            {id: 5, name: 'Luis', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/10/23/ecde1c7a-c3c9-4e7f-b652-b747a870f697/C-PEREZ_players_BARCA_B.jpg?width=1200&height=750'},
            {id: 6, name: 'Marc', imageUri: 'https://e0.365dm.com/19/12/768x432/skysports-antoine-griezmann_4856510.jpg?20191204155640'},
            {id: 7, name: 'Sergio', imageUri: 'https://pbs.twimg.com/profile_images/1198234817273454592/81t8iNr8_400x400.jpg'}
        ];

        this.state.isLoading = false;
        console.log('Chat list data loaded ' + this.state.chatListData);
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    listHeader: {
        textAlign:"center",
        padding: 5
    },
    base: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})