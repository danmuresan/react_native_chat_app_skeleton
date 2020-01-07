import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonStyles }  from '../components/ui-helpers/CommonStyles' 
import { AppColors } from './ui-helpers/Colors';
import { Divider } from 'react-native-elements';

export default class ChatDetailsView extends React.Component {
    render() {
        const contactItemName = this.props.navigation.getParam('name', '???');
        const contactItemImage = this.props.navigation.getParam('avatarUri', undefined);
        console.log('Preparing to render details screen for contact with name ' + contactItemName);
        return (
            <View style={styles.container}>
                <Image
                    style={styles.contactDetailsImage}
                    source={{uri: contactItemImage}} />
                <Text style={styles.contactItemName}>
                    {contactItemName}
                </Text>
                <Divider style={styles.contactDetailsDivider}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contactDetailsImage: {
        height: 200,
        width: 200,
        borderRadius: 200,
        alignSelf: "center",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: AppColors.appBrand,
        margin: 16
    },
    contactItemName: {
        textAlign: 'center',
        fontWeight: "bold",
        color: AppColors.textColorPrimary,
        margin: 8 
    },
    contactDetailsDivider: {
        color: AppColors.separatorListItemDefault,
        width: '100%',
        height: 1,
        marginTop: 8,
        marginBottom: 8
    },
    container: {
        flex: 1
    }
});