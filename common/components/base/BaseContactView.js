import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonStyles }  from '../ui-helpers/CommonStyles' 
import { AppColors } from '../ui-helpers/Colors';
import { Divider, Icon } from 'react-native-elements';

const ViewState = Object.freeze({
    LOADING: 1,
    PROFILE: 2,
    CONTACT: 3,
    ERROR: 4
});

export default class BaseContactView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contactAvatarUri: this.props.contactAvatarUri,
            contactName: this.props.contactName,
            viewState: ViewState.LOADING
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return this.renderForState();
    }

    renderForState() {
        console.log('Loading up contact screen for state: ' + this.state.viewState);
        switch (this.state.viewState) {
            case ViewState.LOADING:
                console.log('xxx')
                return (
                    <View style={CommonStyles.base}>
                        <Text>Loading...</Text>
                    </View>
                );
            case ViewState.ERROR:
                return (
                    <View style={CommonStyles.base}>
                        <Text>Something went wrong, please try again!</Text>
                    </View>
                );
            case ViewState.PROFILE:
                return (
                    <View style={styles.container}>
                        <Image
                            style={styles.contactDetailsImage}
                            source={{uri: this.state.contactAvatarUri}} />
                        <Icon
                            style={styles.changeAvatarIcon}
                            name='add_a_photo'
                            color={AppColors.appBrand}/>
                        <Text style={styles.contactItemName}>
                            {this.state.contactName}
                        </Text>
                        <Divider style={styles.contactDetailsDivider}/>
                    </View>
                );
            case ViewState.CONTACT:
                return (
                    <View style={styles.container}>
                        <Image
                            style={styles.contactDetailsImage}
                            source={{uri: this.state.contactAvatarUri}} />
                        <Text style={styles.contactItemName}>
                            {this.state.contactName}
                        </Text>
                        <Divider style={styles.contactDetailsDivider}/>
                    </View>
                );
        }
    }

    loadData() {
        if (this.props.isProfileScreen) {
            this.state.viewState = ViewState.PROFILE;
        } else {
            this.state.viewState = ViewState.CONTACT;
        }

        this.setState(this.state);
    }
}

const styles = StyleSheet.create({
    contactDetailsImage: {
        height: 200,
        width: 200,
        borderRadius: 200,
        alignSelf: "center",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: AppColors.appBrand,
        margin: 16
    },
    contactItemName: {
        textAlign: 'center',
        fontWeight: "bold",
        color: AppColors.textColorPrimary,
        margin: 8 
    },
    contactDetailsDivider: {
        color: AppColors.separatorListItemDefault,
        width: '100%',
        height: 1,
        marginTop: 8,
        marginBottom: 8
    },
    container: {
        flex: 1
    },
    changeAvatarIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});