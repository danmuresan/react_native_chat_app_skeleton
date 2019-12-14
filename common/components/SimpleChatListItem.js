import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../components/ui-helpers/Colors'
// import ChatTabNavigator from '../navigation/ChatTabNavigator'

export class SimpleChatListItem extends Component {

    //static router = ChatTabNavigator.router

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
                    <View>
                        <Text
                            style={styles.chatItemTitle}>
                            {this.props.contactName}
                        </Text>
                        <Text
                            style={styles.chatItemSubtitle}>
                            Some text goes here...
                        </Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        );
    }

    onItemClicked() {
        // const navigate = this.props.navigation;
        // this.props.navigate('ChatDetails');
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    itemImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        margin: 12
    },
    chatItemTitle: {
        flex: 1,
        fontSize: 17,
        color: AppColors.textColorPrimary,
        fontWeight: 'bold',
        paddingEnd: 8,
        paddingTop: 12
    },
    chatItemSubtitle: {
        flex: 0.9,
        paddingBottom: 12,
        color: AppColors.textColorSecondary
    }
}); 