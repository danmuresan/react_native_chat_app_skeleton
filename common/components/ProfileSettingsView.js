import React from 'react'
import BaseContactView from './base/BaseContactView';
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'

export default class ProfileSettingsView extends React.Component {
    render() {
        const profileData = this.getProfileData();
        console.log('Preparing to open profile page for profile with data ' + profileData);

        return (
            <BaseContactView 
                isProfileScreen={true}
                contactAvatarUri={profileData.profileImageUri}
                contactName={profileData.profileFullName}
                contactOptionsList={profileData.profileOptions}/>
        );
    }

    getProfileData() {
        // TODO: fetch actual data
        return {
            profileFullName: "User Fullname",
            profileImageUri: 'https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png',
            profileOptions: [
                {optionText: getLocalizedString('ChangeStatusLabel'), optionIconName: "adjust"},
                {optionText: getLocalizedString('ShareProfileLabel'), optionIconName: "share"},
                {optionText: getLocalizedString('SettingsLabel'), optionIconName: "settings"}
            ]
        }
    }
}