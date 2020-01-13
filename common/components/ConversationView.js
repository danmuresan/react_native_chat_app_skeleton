import React from 'react'
import { View, Text, TextInput, Keyboard, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { CommonStyles } from './ui-helpers/CommonStyles'
import { AppColors } from './ui-helpers/Colors'
import getLocalizedString from './ui-helpers/strings/StringLocalizer'

export default class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageComposerHeight: 50,
            text: '',
            shouldShowSendMessageButton: false
        }

        this.onKeyboardHidden = this.onKeyboardHidden.bind(this);
        this.onMessageComposerFocused = this.onMessageComposerFocused.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    componentDidMount() {
        this.setState(this.state);
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.onKeyboardHidden
        )

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.onMessageComposerFocused
        )
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    render() {
        // TODO: ...
        return (
            <View style={CommonStyles.base}>
                <View style={styles.conversationContainer}>
                    <Text style={styles.placeHolderText}>
                        Conversation History will go here...
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.messageComposerContainer}>
                        <TextInput 
                            multiline={true}
                            numberOfLines={5}
                            onFocus={() => this.onMessageComposerFocused()}
                            onContentSizeChange={(event) => {
                                this.setState({ messageComposerHeight: event.nativeEvent.contentSize.height })
                            }}
                            onChangeText={(text) => this.onMessageComposerTextChanged(text)}
                            placeholder={getLocalizedString("TypeMessageLabel")} 
                            value={this.state.text}
                            style={[styles.messageComposer, {height: Math.max(50, this.state.messageComposerHeight)}]} />
                        {this.renderMessageComposerOptions()}
                    </View>
                </View>
            </View>
        );
    }

    renderMessageComposerOptions() {
        if (this.state.shouldShowSendMessageButton) {
            return (
                <View style={styles.actionIcons}>
                    <TouchableOpacity onPress={this.onSendMessage}>
                        <Icon size={40} marginStart={8} color={AppColors.actionPrimary} name='send'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onBeginAudioMessageRecording}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.actionIcons}>
                    <TouchableOpacity onPress={this.onSendMediaCaptureMessage}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='camera'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onBeginAudioMessageRecording}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                    </TouchableOpacity>
                </View>
            );
        }   
    }

    onMessageComposerFocused() {
        console.log('Message composer focused...');
        if (this.state.text.length >= 1) {
            this.state.shouldShowSendMessageButton = true;
            this.setState(this.state);
        }
    }

    onKeyboardHidden() {
        console.log('Message composer unfocused...');
        this.state.shouldShowSendMessageButton = false;
        this.setState(this.state);
    }

    onMessageComposerTextChanged(text) {
        console.log('LENGTH ' + text.length)
        this.state.shouldShowSendMessageButton = text.length >= 1;
        this.state.text = text;
        this.setState(this.state);
    }

    // message actions (should be logically grouped in some other place, same class / extension)
    onSendMessage() {
        console.log('Send Message requested');
        this.state.text = '';
        this.state.shouldShowSendMessageButton = false;
        this.setState(this.state);
        ToastAndroid.show('TODO: Send Message', ToastAndroid.LONG);
    }

    onSendMediaCaptureMessage() {
        console.log('Open camera for media capture requested')
        ToastAndroid.show('TODO: Send Media Capture', ToastAndroid.LONG);
    }

    onBeginAudioMessageRecording() {
        console.log('Begin audio recording requested')
        ToastAndroid.show('TODO: Begin Audio Message', ToastAndroid.LONG);
    }
}

const styles = StyleSheet.create({
    placeHolderText: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    conversationContainer: {
        flex: 3
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
    }
});