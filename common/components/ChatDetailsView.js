import React, { Component } from 'react'
import BaseContactView from './base/BaseContactView'

export default class ChatDetailsView extends React.Component {
    render() {
        const contactItemName = this.props.navigation.getParam('name', '???');
        const contactItemImageUri = this.props.navigation.getParam('avatarUri', undefined);
        console.log('Preparing to render details screen for contact with name ' + contactItemName);
        
        return (
            <BaseContactView isProfileScreen={false}
                             contactAvatarUri={contactItemImageUri}
                             contactName={contactItemName}/>
        );
    }
}