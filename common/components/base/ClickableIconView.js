import React from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';

export class ClickableIconView extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onIconClicked}>
                <Icon 
                    name={this.props.iconName} 
                    color={this.props.iconColor}/>
            </TouchableOpacity> 
        );
    }
}