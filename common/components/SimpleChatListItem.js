import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import ChatTabNavigator from '../navigation/ChatTabNavigator'

export class SimpleChatListItem extends Component {

    static router = ChatTabNavigator.router

    constructor(props) {
        super(props);
        console.log('Chat list item initialized for item ' + props.contactName + ', imageUri:' + props.avatarUri);            
    }

    render() {
        return (
            <TouchableOpacity style={styles.touchableListItem} onPressIn={this.onItemClicked}>
                <View style={styles.itemContainer}>
                    <Image 
                        style={styles.itemImage}
                        source={{uri: this.props.avatarUri}}/>
                    <Text
                        style={styles.itemText}>
                        {this.props.contactName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    onItemClicked() {
        const navigate = this.props.navigation;
        this.props.navigate('ChatDetails');
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').width * 0.2
        flex: 1,
        flexDirection: 'row'
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        flex: 0.1,
        margin: 8
    },
    itemText: {
        flex: 0.9,
        textAlignVertical: "center",
        paddingEnd: 8,
        paddingVertical: 8
    }
}); 