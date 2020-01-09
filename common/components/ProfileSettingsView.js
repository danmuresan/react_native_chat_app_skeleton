import React from 'react'
import BaseContactView from './base/BaseContactView';
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'
import { createContactOptionModel, OptionType } from './models/ContactOptionModel'
import MockService from '../services/MockService'

export default class ProfileSettingsView extends React.Component {
    render() {
        const profileData = this.getProfileData();
        console.log('Preparing to open profile page for profile with data ' + profileData);

        return (
            <BaseContactView 
                isProfileScreen={true}
                loadDataTask={profileData.profileFetchPromise}
                contactOptionsList={profileData.profileOptions}/>
        );
    }

    getProfileData() {
        // TODO: fetch actual data
        return {
            profileFetchPromise: this.prepareProfileDataAsync,
            profileOptions: [
                createContactOptionModel(getLocalizedString('ChangeStatusLabel'), "adjust", OptionType.CHANGE_STATUS),
                createContactOptionModel(getLocalizedString('ShareProfileLabel'), "share", OptionType.SHARE_PROFILE),
                createContactOptionModel(getLocalizedString('SettingsLabel'), "settings", OptionType.SETTINGS)
            ]
        }
    }

    async prepareProfileDataAsync() {
        const profileData = await MockService.fetchProfileAsync();
        return {
            contactAvatarUri: profileData.profileImageUri,
            contactName: profileData.fullName
        }
    }
}