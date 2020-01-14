import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { AppColors } from '../ui-helpers/Colors'

export class ConversationHeaderView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this._onBackButtonPressed()}>
                    <Icon 
                        name="keyboard-backspace" 
                        margin={8}
                        color={AppColors.backgroundSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onAvatarIconPressed()}>
                    <Image 
                        style={styles.avatar}
                        source={{uri: this.props.contactAvatarUri}} />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {this.props.contactName}
                </Text>
            </View>
        );
    }

    _onBackButtonPressed() {
        console.log('Back navigation requested');   
        if (this.props.navigation) {
            this.props.navigation.pop();
        }
    }

    _onAvatarIconPressed() {
        if (this.props.navigation) {
            this.props.navigation.navigate('ChatDetails', {
                id: this.props.contactId,
                name: this.props.contactName,
                avatarUri: this.props.contactAvatarUri
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
        minHeight: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: AppColors.appBrand
    },
    avatar: {
        height: 30,
        width: 30,
        padding: 8,
        margin: 4,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: AppColors.backgroundSecondary
    },
    name: {
        padding: 8,
        color: AppColors.backgroundSecondary,
        fontWeight: 'bold',
    }
});
