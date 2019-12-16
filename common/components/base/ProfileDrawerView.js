import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { AppColors } from '../ui-helpers/Colors';

export class ProfileDrawerView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // TODO: default (should be based on some API call)
            imageUri: 'https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png'
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onProfileClicked}>
                <Image 
                    style={styles.profileImage}
                    source={{uri: this.state.imageUri}} />
            </TouchableOpacity>
        );
    }

    // TODO: EXPORT THIS SOMEHOW
    updateProfilePicture(uri) {
        // TODO: ...
        if (uri === undefined) {
            console.log('Error uploading new profile pic: invalid uri')
            return
        }

        this.state.imageUri = uri
        this.setState(this.state)
    }
}

const styles = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        marginBottom: 16,   // TODO: figure out a better way to position this 
        alignSelf: 'stretch',
        borderRadius: 60,
        borderColor: AppColors.appBrand,
        borderWidth: 1
    }
});