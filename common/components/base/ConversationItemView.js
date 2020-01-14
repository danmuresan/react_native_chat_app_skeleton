import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { AppColors } from '../ui-helpers/Colors'
import { MessageReceiptState } from '../ConversationView'

export class ConversationItemView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.renderChatBubble(this.props.isConversationPartner)}
            </View>
        );
    }

    renderChatBubble(isConversationPartner) {
        if (isConversationPartner) {
            return (
                <View>
                    <View style={{flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                alignSelf: 'flex-start'}}>
                        <Image 
                            style={styles.bubbleImage}
                            source={{uri: this.props.conversationPartnerAvatarUri}}/>
                        <View style={styles.conversationPartnerMessageBubble}>
                            <Text
                                style={styles.conversationPartnerMessageBubbleText}>
                                {this.props.messageContent}
                            </Text>
                        </View>
                        <View style={{flex: 0.2}}/>
                    </View>
                    <Text style={styles.coversationPartnerMessageTimestamp}>
                        {this.props.messageTimestamp}
                    </Text>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.currentUserMessageBubble}>
                        <Text
                            style={styles.currentUserMessageBubbleText}>
                            {this.props.messageContent}
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={styles.currentUserMessageTimestamp}>
                            {this.props.messageTimestamp}
                        </Text>
                        {this.renderMessageReceiptStatus(this.props.messageReceiptStatus)}
                    </View>
                </View>
            );
        }
    }

    renderMessageReceiptStatus(status) {
        if (status === MessageReceiptState.READ)
            return (
                <Icon name='check' color={AppColors.textColorSecondary} size={12} marginStart={-8} marginEnd={16} />
            );

        // TODO: handle other cases as well
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 8,
        marginEnd: 8,
        marginTop: 8
    },
    bubbleImage: {
        width: 35,
        height: 35,
        borderRadius: 30,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: AppColors.appBrand,
        margin: 8
    },
    conversationPartnerMessageBubble: {
        flex: 0.8,
        marginEnd: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'auto',
        backgroundColor: AppColors.backgroundSecondary,
        borderRadius: 15, 
        borderWidth: 1,
        borderColor: AppColors.appBrand
    },
    conversationPartnerMessageBubbleText: {
        flexShrink: 1,
        padding: 8,
        margin: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    currentUserMessageBubble: {
        flex: 1,
        marginStart: 48,
        marginEnd: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        backgroundColor: AppColors.appBrand,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: AppColors.appBrand
    },
    currentUserMessageBubbleText: {
        padding: 8,
        margin: 2,
        color: AppColors.backgroundPrimary,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    currentUserMessageTimestamp: {
        fontSize: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginEnd: 16,
        color: AppColors.textColorSecondary
    },
    coversationPartnerMessageTimestamp: {
        fontSize: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 55,
        color: AppColors.textColorSecondary
    }
})