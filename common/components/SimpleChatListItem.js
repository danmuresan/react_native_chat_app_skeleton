import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../components/ui-helpers/Colors'
import PropTypes from 'prop-types'

export class SimpleChatListItem extends Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            avatarUri: PropTypes.string,
            contactName: PropTypes.string,
            id: PropTypes.number
        };

        console.log('Chat list item initialized for item ' + props.contactName 
            + ', imageUri:' + props.avatarUri 
            + ', navigation: ' + (props.navigation !== undefined));
            
        this.navigateToConversationHistory = this.navigateToConversationHistory.bind(this);
        this.navigateToChatDetails = this.navigateToChatDetails.bind(this);
    }

    render() {
        return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity style={styles.touchableListItem} onPress={this.navigateToChatDetails} delayPressIn={10}>
                        <Image 
                            style={styles.itemImage}
                            source={{uri: this.props.avatarUri}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableListItem} onPress={this.navigateToConversationHistory} delayPressIn={20}>
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
                    </TouchableOpacity>
                </View>
        );
    }

    navigateToConversationHistory() {
        this.props.navigation.navigate('Conversation', {
            id: this.props.id,
            contactName: this.props.contactName,
            contactAvatarUri: this.props.avatarUri
        });
    }

    navigateToChatDetails() {
        this.props.navigation.navigate('ChatDetails', {
            id: this.props.id,
            name: this.props.contactName,
            avatarUri: this.props.avatarUri
        });
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