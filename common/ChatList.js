import React, { Component } from 'react'
import { FlatList, StyleSheet, View} from 'react-native'

export default class SimpleChatList extends Component {


    render() {
        return (
            <View>
                <FlatList data={[
                    {key: 'Ansu'},
                    {key: 'Carlos'},
                    {key: 'Antoine'},
                    {key: 'Johhny El Diablo'}
                ]}
                renderItem={({ item }) => {
                    return (
                        <SimpleChatListItem avatarUri='' contactName=''/>
                    )
                }}>
                </FlatList>
            </View>
        )
    }
}