import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonStyles }  from '../components/ui-helpers/CommonStyles' 

export default class ChatDetailsView extends React.Component {
    render() {
        const contactItemName = this.props.navigation.getParam('name', '???');
        console.log('Preparing to render details screen for contact with name ' + contactItemName);
        return (
            <View style={CommonStyles.base}>
                <Text style={CommonStyles.centerVerticalHorizontalText}>
                    {contactItemName}
                </Text>
            </View>
        );
    }
}