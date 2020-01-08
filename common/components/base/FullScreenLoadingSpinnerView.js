import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { CommonStyles } from '../ui-helpers/CommonStyles'
import PropTypes from 'prop-types'

export class FullScreenLoadingSpinnerView extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.spinnerSize === undefined) {
            this.props.spinnerSize = 'medium';
        }

        this.propTypes = {
            spinnerSize: PropTypes.string
        };
    }

    render() {
        return (
            <View style={CommonStyles.base}>
                <ActivityIndicator size={this.props.spinnerSize} />
            </View>
        );
    }
}