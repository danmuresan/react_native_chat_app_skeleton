import React from 'react'
import BaseContactView from './base/BaseContactView';
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'
import { createContactOptionModel, OptionType } from './models/ContactOptionModel'
import MockService from '../services/MockService'

export default class ProfileSettingsView extends React.Component {
    render() {
        const profileData = this._getProfileData();
        console.log('Preparing to open profile page for profile with data ' + profileData);

        return (
            <BaseContactView 
                isProfileScreen={true}
                navigation={this.props.navigation}
                loadDataTask={profileData.profileFetchPromise}
                contactOptionsList={profileData.profileOptions}/>
        );
    }

    _getProfileData() {
        // TODO: fetch actual data
        return {
            profileFetchPromise: this._prepareProfileDataAsync,
            profileOptions: [
                createContactOptionModel(getLocalizedString('ChangeStatusLabel'), "adjust", OptionType.CHANGE_STATUS),
                createContactOptionModel(getLocalizedString('ShareProfileLabel'), "share", OptionType.SHARE_PROFILE),
                createContactOptionModel(getLocalizedString('SettingsLabel'), "settings", OptionType.SETTINGS)
            ]
        }
    }

    async _prepareProfileDataAsync() {
        const profileData = await MockService.fetchProfileAsync();
        return {
            contactAvatarUri: profileData.profileImageUri,
            contactName: profileData.fullName
        }
    }
}