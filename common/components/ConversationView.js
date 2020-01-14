import React from 'react'
import { View, Text, TextInput, FlatList, Keyboard, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { CommonStyles } from './ui-helpers/CommonStyles'
import { AppColors } from './ui-helpers/Colors'
import { FullScreenLoadingSpinnerView } from './base/FullScreenLoadingSpinnerView'
import { ConversationItemView } from './base/ConversationItemView'
import { ConversationHeaderView } from './base/ConversationHeaderView'
import { DateTimeUtils } from '../utils/DateTimeUtils'
import { MiscUtils } from '../utils/MiscUtils'
import MockService from '../services/MockService'
import getLocalizedString from './ui-helpers/strings/StringLocalizer'

export const MessageReceiptState = Object.freeze({
    DEFAULT: 1,
    SENT: 2,
    READ: 3
});

export default class ConversationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageComposerHeight: 50,
            text: '',
            shouldShowSendMessageButton: false,
            conversationHistoryList: [],
            isLoading: false
        }

        this._onKeyboardHidden = this._onKeyboardHidden.bind(this);
        this._onMessageComposerFocused = this._onMessageComposerFocused.bind(this);
        this._onSendMessage = this._onSendMessage.bind(this);
        
        // TODO: remove mock stuff
        this.messagesUntilMockReply = 2;
        this.mockReplies = ['Haha, I know what you are saying, can totally relate to it :))',
                            'Nope, I completely disagree and I believe you realy suck sometimes :/',
                            'Funny, but try again cuz Im not really laughing',
                            'Yes, sure']
    }

    async componentDidMount() {
        this.state.isLoading = true;
        this.setState(this.state);
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._onKeyboardHidden
        )

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._onMessageComposerFocused
        )

        await this._loadConversationHistoryAsync();
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    render() {
        const contactItemName = this.props.navigation.getParam('contactName', '???');
        const contactId = this.props.navigation.getParam('id', undefined);
        const contactAvatarUri = this.props.navigation.getParam('contactAvatarUri', undefined);

        // TODO: ...
        return (
            <View style={CommonStyles.base}>
                <ConversationHeaderView 
                    navigation={this.props.navigation}
                    contactId={contactId}
                    contactName={contactItemName}
                    contactAvatarUri={contactAvatarUri} />

                <View style={styles.conversationContainer}>
                    {this._renderConversationHistory(contactItemName, contactAvatarUri)}
                </View>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.messageComposerContainer}>
                        <TextInput 
                            multiline={true}
                            numberOfLines={5}
                            onFocus={() => this._onMessageComposerFocused()}
                            onContentSizeChange={(event) => {
                                this.setState({ messageComposerHeight: event.nativeEvent.contentSize.height })
                            }}
                            onChangeText={(text) => this._onMessageComposerTextChanged(text)}
                            placeholder={getLocalizedString("TypeMessageLabel")} 
                            value={this.state.text}
                            style={[styles.messageComposer, {height: Math.max(50, this.state.messageComposerHeight)}]} />
                        {this._renderMessageComposerOptions()}
                    </View>
                </View>
            </View>
        );
    }

    _renderConversationHistory(contactItemName, contactAvatarUri) {
        if (this.state.isLoading) {
            return (<FullScreenLoadingSpinnerView />);
        }

        if (this.state.conversationHistoryList.length === 0) {
            return (
                <Text style={styles.placeHolderText}>
                    Looks like your conversation with {contactItemName} is empty.
                </Text>
            );
        } else {
            return (
                <FlatList
                    ref={ref => this.flatList = ref}
                    style={styles.conversationHistoryFlatList}
                    data={this.state.conversationHistoryList}
                    onContentSizeChange={() => this.flatList.scrollToEnd(true)}
                    renderItem={({item}) => {
                        return (
                            <ConversationItemView 
                                isConversationPartner={!item.isCurrentlyLoggedInUserMessage} 
                                conversationPartnerAvatarUri={contactAvatarUri}
                                messageContent={item.messageContent}
                                messageTimestamp={DateTimeUtils.pretifyDateForMessageBubble(item.timestamp)}
                                messageReceiptStatus={this._mockMessageReceiptStatus(item)} />
                        );
                    }}/>
            );
        }
    }

    _renderMessageComposerOptions() {
        if (this.state.shouldShowSendMessageButton) {
            return (
                <View style={styles.actionIcons}>
                    <TouchableOpacity onPress={this._onSendMessage}>
                        <Icon size={40} marginStart={8} color={AppColors.actionPrimary} name='send'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onBeginAudioMessageRecording}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.actionIcons}>
                    <TouchableOpacity onPress={this._onSendMediaCaptureMessage}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='camera'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onBeginAudioMessageRecording}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                    </TouchableOpacity>
                </View>
            );
        }   
    }

    async _loadConversationHistoryAsync() {
        this.state.conversationHistoryList = await MockService.fetchMockMessagesAsync();
        //this.state.conversationHistoryList = []; // TODO: ....
        this.state.isLoading = false;
        this.setState(this.state)
    }

    _onMessageComposerFocused() {
        console.log('Message composer focused...');
        if (this.state.text.length >= 1) {
            this.state.shouldShowSendMessageButton = true;
            this.setState(this.state);
        }
    }

    _onKeyboardHidden() {
        console.log('Message composer unfocused...');
        this.state.shouldShowSendMessageButton = false;
        this.setState(this.state);
    }

    _onMessageComposerTextChanged(text) {
        this.state.shouldShowSendMessageButton = text.length >= 1;
        this.state.text = text;
        this.setState(this.state);
    }

    // message actions (should be logically grouped in some other place, same class / extension)
    _onSendMessage() {
        console.log('Send Message requested');
        this._processAndSendMessage(this.state.text);

        this.state.text = '';
        this.state.shouldShowSendMessageButton = false;
        this.setState(this.state);
    }

    _onSendMediaCaptureMessage() {
        console.log('Open camera for media capture requested')
        ToastAndroid.show('TODO: Send Media Capture', ToastAndroid.LONG);
    }

    _onBeginAudioMessageRecording() {
        console.log('Begin audio recording requested')
        ToastAndroid.show('TODO: Begin Audio Message', ToastAndroid.LONG);
    }

    _mockMessageReceiptStatus(messageItem) {
        // check message item receipt status
        if (!messageItem.isCurrentlyLoggedInUserMessage) {
            return MessageReceiptState.DEFAULT;
        }

        if (this.state.conversationHistoryList.indexOf(messageItem) === this.state.conversationHistoryList.length - 1) {
            return MessageReceiptState.READ;
        }
    }

    _processAndSendMessage(text) {
        this.state.conversationHistoryList.push({
            messageContent: text,
            timestamp: new Date(),
            isCurrentlyLoggedInUserMessage: true
        });

        this._updateMockReplyLogic();
    }

    _updateMockReplyLogic() {
        this.messagesUntilMockReply--;
        if (this.messagesUntilMockReply === 0) {
            const mockReply = this.mockReplies[MiscUtils.randomNumberInRange(0, 3)];
            console.log('Mocking a reply message (' + mockReply + ')')
            this.state.conversationHistoryList.push({
                messageContent: mockReply,
                timestamp: new Date(),
                isCurrentlyLoggedInUserMessage: false
            });

            this.messagesUntilMockReply = 2;
        }
    }
}

const styles = StyleSheet.create({
    placeHolderText: {
        flex: 1, 
        padding: 24,
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    conversationContainer: {
        flex: 8
    },
    messageComposerContainer: {
        flex: 1,
        width: '100%',
        paddingStart: 16,
        paddingEnd: 8,
        flexDirection: 'row'
    },
    messageComposer: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: AppColors.appBrand,
        padding: 12,
        maxHeight: 90,
        width: '72%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    actionIcons: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    conversationHistoryFlatList: {
        flex: 1,
        width: '100%',
        marginBottom: 4,
        marginTop: 4
    }
});