import React from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

export class ClickableIconView extends React.Component {

    constructor(props) {
        super(props);
        this.propTypes = {
            iconName: PropTypes.string
        };
    }

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