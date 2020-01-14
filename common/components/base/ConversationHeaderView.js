import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { AppColors } from '../ui-helpers/Colors'

export class ConversationHeaderView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.onBackButtonPressed()}>
                    <Icon 
                        name="keyboard-backspace" 
                        margin={8}
                        color={AppColors.backgroundSecondary} />
                </TouchableOpacity>
                <Image 
                    style={styles.avatar}
                    source={{uri: this.props.contactAvatarUri}} />
                <Text style={styles.name}>
                    {this.props.contactName}
                </Text>
            </View>
        );
    }

    onBackButtonPressed() {
        console.log('Back navigation requested');   
        if (this.props.navigation) {
            this.props.navigation.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
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
