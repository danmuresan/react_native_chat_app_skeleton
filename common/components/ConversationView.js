import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { CommonStyles } from './ui-helpers/CommonStyles'
import { AppColors } from './ui-helpers/Colors'
import getLocalizedString from './ui-helpers/strings/StringLocalizer'

export default class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageComposerHeight: 50
        }
    }

    componentDidMount() {
        this.setState(this.state);
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
                            onContentSizeChange={(event) => {
                                this.setState({ messageComposerHeight: event.nativeEvent.contentSize.height })
                            }}
                            placeholder={getLocalizedString("TypeMessageLabel")} 
                            style={[styles.messageComposer, {height: Math.max(50, this.state.messageComposerHeight)}]} />
                        <View style={styles.actionIcons}>
                            <Icon size={40} marginStart={8} color={AppColors.appBrand} name='camera'/>
                            <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                        </View>
                    </View>
                </View>
            </View>
        );
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