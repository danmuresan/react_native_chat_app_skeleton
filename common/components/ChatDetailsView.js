import React, { Component } from 'react'
import BaseContactView from './base/BaseContactView'
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'

export default class ChatDetailsView extends React.Component {
    render() {
        const contactItemName = this.props.navigation.getParam('name', '???');
        const contactItemImageUri = this.props.navigation.getParam('avatarUri', undefined);
        const contactOptions = [
            {optionText: getLocalizedString('SendMessageLabel'), optionIconName: "message"},
            {optionText: getLocalizedString('PlaceCallLabel'), optionIconName: "call"},
            {optionText: getLocalizedString('RemoveContactLabel'), optionIconName: "remove-circle"},
        ];
        console.log(contactOptions);
        console.log('Preparing to render details screen for contact with name ' + contactItemName);
        
        return (
            <BaseContactView isProfileScreen={false}
                             contactAvatarUri={contactItemImageUri}
                             contactName={contactItemName}
                             contactOptionsList={contactOptions}/>
        );
    }
}