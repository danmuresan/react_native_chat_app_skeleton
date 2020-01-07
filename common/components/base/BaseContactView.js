import React from 'react'
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal, StyleSheet, Dimensions } from 'react-native'
import { CommonStyles }  from '../ui-helpers/CommonStyles' 
import { AppColors } from '../ui-helpers/Colors';
import { Divider, Icon } from 'react-native-elements';
import { FullScreenLoadingSpinnerView } from './FullScreenLoadingSpinnerView';
import { TextWithIconTouchable } from './TextWithIconTouchable';
import timeout from '../../utils/AsyncUtils'

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
                            Something went wrong, please try again!
                        </Text>
                    </View>
                );
            case ViewState.PROFILE:
                return (
                    <View style={styles.container}>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.avatarChangeModalVisible}
                            onRequestClose={() => {
                                console.log('Avatar change modal has been closed.');
                                this.setModalVisible(false);
                            }}>
                            <View style={{marginTop: 22, flex: 1}}>
                                <View style={CommonStyles.base}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalVisible(!this.state.avatarChangeModalVisible);
                                        }}>
                                        <Text style={CommonStyles.centerVerticalHorizontalText}>
                                            TODO: Options For Changing Pick Here
                                        </Text>
                                    </TouchableHighlight>
                                </View>
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
                                        icon={item.optionIconName}
                                        onPress={this.onOptionSelected(item)} />
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
                                        onPress={this.onOptionSelected(item)} />
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
        console.log("Option clicked " + option);
    }    

    onProfileAvatarChangeRequested() {
        console.log("Profile avatar change requested. Opening menu...");
        this.setModalVisible(true);
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