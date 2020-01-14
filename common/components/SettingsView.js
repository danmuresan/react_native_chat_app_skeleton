import React from 'react'
import { View, Text } from 'react-native'
import { CommonStyles } from './ui-helpers/CommonStyles' 

export default class SettingsView extends React.Component {
    render () {
        // TODO: ...
        return (
            <View style={CommonStyles.base}>
                <Text style={CommonStyles.centerVerticalHorizontalText}>
                    APP SETTINGS SHOULD GO HERE...
                </Text>
            </View>
        );
    }
}