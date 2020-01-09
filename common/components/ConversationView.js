import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { CommonStyles } from './ui-helpers/CommonStyles'
import { AppColors } from './ui-helpers/Colors'

export default class ConversationView extends React.Component {
    render () {
        // TODO: ...
        return (
            <View style={CommonStyles.base}>
                <Text style={styles.placeHolderText}>
                    Conversation History will go here...
                </Text>
                <View style={styles.messageComposerContainer}>
                    <TextInput style={styles.messageComposer} />
                    <View style={styles.actionIcons}>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='camera'/>
                        <Icon size={40} marginStart={8} color={AppColors.appBrand} name='keyboard-voice'/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeHolderText: {
        flex: 0.92, 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    messageComposerContainer: {
        flex: 0.08,
        width: '100%',
        paddingStart: 8,
        paddingEnd: 8,
        flexDirection: 'row'
    },
    messageComposer: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: AppColors.appBrand,
        width: '70%',
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