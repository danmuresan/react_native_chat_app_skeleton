import React from 'react'
import BaseContactView from './base/BaseContactView';

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
                {optionText: "Change Status" , optionIconName: "adjust"},
                {optionText: "Share Profile" , optionIconName: "share"},
                {optionText: "Settings" , optionIconName: "settings"}
            ]
        }
    }
}