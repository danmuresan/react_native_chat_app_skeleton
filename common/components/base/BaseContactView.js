import React from 'react'
import { View, Text, Image, FlatList, TouchableWithoutFeedback, ToastAndroid, Modal, StyleSheet, Dimensions } from 'react-native'
import { CommonStyles }  from '../ui-helpers/CommonStyles' 
import { AppColors } from '../ui-helpers/Colors';
import { Divider, Icon } from 'react-native-elements';
import { FullScreenLoadingSpinnerView } from './FullScreenLoadingSpinnerView';
import { TextWithIconTouchable } from './TextWithIconTouchable';
import PropTypes from 'prop-types'
import timeout from '../../utils/AsyncUtils'
import getLocalizedString from '../ui-helpers/strings/StringLocalizer'
import { OptionType } from '../models/ContactOptionModel';

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
            viewState: ViewState.LOADING,
            avatarChangeModalVisible: false
        };

        this.propTypes = {
            contactAvatarUri: PropTypes.string,
            contactName: PropTypes.string,
            viewState: PropTypes.object,
            avatarChangeModalVisible: PropTypes.bool
        };

        this.loadDataAsync = this.loadDataAsync.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.onProfileAvatarChangeRequested = this.onProfileAvatarChangeRequested.bind(this);
    }

    async componentDidMount() {
        await this.loadDataAsync();
    }

    render() {
        return this.renderForState();
    }

    renderForState() {
        console.log('Loading up contact screen for state: ' + this.state.viewState);
        switch (this.state.viewState) {
            case ViewState.LOADING:
                return (
                    <FullScreenLoadingSpinnerView />
                );
            case ViewState.ERROR:
                return (
                    <View style={CommonStyles.base}>
                        <Text style={CommonStyles.centerVerticalHorizontalText}>
                            {getLocalizedString('GenericErrorLabel')}
                        </Text>
                    </View>
                );
            case ViewState.PROFILE:
                return (
                    <View style={styles.container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.avatarChangeModalVisible}
                            onRequestClose={() => {
                                console.log('Avatar change modal has been closed.');
                                this.setModalVisible(false);
                            }}>
                            <View style={styles.changeAvatarModal}>
                                <TouchableWithoutFeedback onPress={() => this.onChangeAvatarOptionSelected(true)}>
                                    <View style={{
                                            flex: 1, 
                                            flexDirection: 'row', 
                                            padding: 16,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'stretch'
                                        }}>
                                        <Icon name="camera"/>
                                        <Text style={{marginStart: 8}}>{getLocalizedString('TakePhotoLabel')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Divider style={styles.contactDetailsDivider} />
                                <TouchableWithoutFeedback onPress={() => this.onChangeAvatarOptionSelected(false)}>
                                    <View style={{
                                            flex: 1, 
                                            flexDirection: 'row', 
                                            padding: 16,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'stretch'
                                        }}>
                                        <Icon name="photo"/>
                                        <Text style={{marginStart: 8}}>{getLocalizedString('ChooseGalleryLabel')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </Modal>
                        <TouchableWithoutFeedback style={styles.changeAvatarContainer} onPress={this.onProfileAvatarChangeRequested}>
                            <View>
                                <Image
                                    style={styles.contactDetailsImage}
                                    source={{uri: this.state.contactAvatarUri}} />
                                <View style={styles.changeAvatarIcon}>
                                    <Icon
                                        name='photo'
                                        size={50}
                                        color={AppColors.appBrand}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.contactItemName}>
                            {this.state.contactName}
                        </Text>
                        <Divider style={styles.contactDetailsDivider}/>
                        <FlatList 
                            ItemSeparatorComponent={this.renderListItemSeparator}
                            style={styles.list}
                            data={this.props.contactOptionsList}
                            renderItem={({ item }) => {
                                return (
                                    <TextWithIconTouchable
                                        text={item.optionText}
                                        iconName={item.optionIconName}
                                        onPress={() => this.onOptionSelected(item)} />
                                )
                            }}/>
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
                        <FlatList 
                            ItemSeparatorComponent={this.renderListItemSeparator}
                            style={styles.list}
                            data={this.props.contactOptionsList}
                            renderItem={({ item }) => {
                                return (
                                    <TextWithIconTouchable
                                        text={item.optionText}
                                        iconName={item.optionIconName}
                                        onPress={() => this.onOptionSelected(item)} />
                                )
                            }}/>
                    </View>
                );
        }
    }

    renderListItemSeparator = () => {
        return (
            <View
              style={styles.listItemSeparator}
            />
          );
    };

    async loadDataAsync() {
        // TODO: remove fake server calls through timeouts
        await timeout(200);

        if (this.props.isProfileScreen) {
            this.state.viewState = ViewState.PROFILE;
        } else {
            this.state.viewState = ViewState.CONTACT;
        }

        this.setState(this.state);
    }

    setModalVisible(visible) {
        this.setState({avatarChangeModalVisible: visible});
    }

    onOptionSelected(option) {
        console.log("Option clicked " + option.optionText + ', type: ' + option.optionType);
        ToastAndroid.show('TODO: Option Clicked: ' + option.optionText + ', type: ' + option.optionType, ToastAndroid.LONG);

        // TODO: navigate / act accordingly
        switch (option.optionType) {
            case OptionType.SETTINGS:
                break;
            case OptionType.SHARE_PROFILE:
                break;
            case OptionType.CHANGE_STATUS:
                break;
            case OptionType.SEND_MESSAGE:
                break;
            case OptionType.CALL:
                break;
            case OptionType.REMOVE_CONTACT:
                break;
        }
    }    

    onProfileAvatarChangeRequested() {
        console.log("Profile avatar change requested. Opening menu...");
        this.setModalVisible(true);
    }

    onChangeAvatarOptionSelected(shouldOpenCamera) {
        this.setModalVisible(!this.state.avatarChangeModalVisible);
        console.log("lalala");

        if (shouldOpenCamera) {
            ToastAndroid.show('TODO: Should go to camera for taking new photo', ToastAndroid.LONG);
        } else {
            ToastAndroid.show('TODO: Should go to gallery for choosing new avatar', ToastAndroid.LONG);
        }
    }
}

const styles = StyleSheet.create({
    contactDetailsImage: {
        height: 200,
        width: 200,
        borderRadius: 200,
        flexDirection: 'row',
        alignSelf: "center",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: AppColors.appBrand,
        marginStart: 16,
        marginEnd: 16,
        marginTop: 16
    },
    contactItemName: {
        textAlign: 'center',
        fontWeight: "bold",
        color: AppColors.textColorPrimary,
        marginStart: 8,
        marginEnd: 8,
        marginBottom: 16,
        marginTop: 16 
    },
    contactDetailsDivider: {
        color: AppColors.separatorListItemDefault,
        width: '100%',
        height: 1,
        marginTop: 8
    },
    container: {
        flex: 1
    },
    changeAvatarIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginStart: 150,
        marginTop: -45
    },
    changeAvatarContainer: {
        width: 230, 
        height: 230, 
        flexDirection: 'row',
        alignSelf: "center", 
        overflow: "hidden"
    },
    changeAvatarModal: {
        flex: 0.3,
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center', 
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: AppColors.backgroundPrimary
    },
    list: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    listItemSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: AppColors.separatorListItemDefault
    }
});