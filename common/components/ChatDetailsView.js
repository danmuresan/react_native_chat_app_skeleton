import React, { Component } from 'react'
import BaseContactView from './base/BaseContactView'
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'
import { createContactOptionModel, OptionType } from './models/ContactOptionModel'

export default class ChatDetailsView extends React.Component {
    render() {
        const contactItemName = this.props.navigation.getParam('name', '???');
        const contactItemImageUri = this.props.navigation.getParam('avatarUri', undefined);
        const contactOptions = [
            createContactOptionModel(getLocalizedString('SendMessageLabel'), "message", OptionType.SEND_MESSAGE),
            createContactOptionModel(getLocalizedString('PlaceCallLabel'), "call", OptionType.CALL),
            createContactOptionModel(getLocalizedString('RemoveContactLabel'), "remove-circle", OptionType.REMOVE_CONTACT)
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