import React from 'react'
import { BackHandler, View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements';
import { AppColors } from '../ui-helpers/Colors'
import { ClickableIconView } from './ClickableIconView'
import { CommonStyles } from '../ui-helpers/CommonStyles'
import { ProfileDrawerView } from './ProfileDrawerView';
import { ProfileSearchBar } from './ProfileSearchBar'

export class CommonHeaderView extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isSearchActive: false
        }

        this.searchBarRef = React.createRef();

        this._onNotificationsIconClicked = this._onNotificationsIconClicked.bind(this);
        this._onSearchIconClicked = this._onSearchIconClicked.bind(this);
        this._onProfileIconClicked = this._onProfileIconClicked.bind(this);
        this._onSearchComplete = this._onSearchComplete.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.isSearchActive) {
                this.state.isSearchActive = false;
                this._onSearchComplete(undefined);
                this.setState(this.state);
                return true;
            } else {
                return false;
            }
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        if (this.state.isSearchActive) {
            return (
                <View style={{width: '100%', backgroundColor: AppColors.appBrand}}>
                    <ProfileSearchBar ref={this.searchBarRef} onSearchComplete={this._onSearchComplete}/>
                </View>          
            );
        }

        return (
            <Header 
                style={CommonStyles.header}
                placement='center'
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={<ClickableIconView iconName='notifications' iconColor={AppColors.buttonPrimary} onIconClicked={this._onNotificationsIconClicked} />}
                centerComponent={<ProfileDrawerView onProfileClicked={this._onProfileIconClicked}/>}
                rightComponent={<ClickableIconView iconName='search' iconColor={AppColors.buttonPrimary} onIconClicked={this._onSearchIconClicked} />}
            />            
        );
    }

    _onSearchComplete(searchPhrase) {
        this.props.onSearchComplete?.(searchPhrase);
    }

    _onNotificationsIconClicked() {
        console.log('Notifications clicked...');
    }

    _onSearchIconClicked() {
        console.log('Search clicked...');
        this.state.isSearchActive = true;
        // this.searchBarRef.current.showKeyboard();
        this.setState(this.state);
    }

    _onProfileIconClicked() {
        console.log('Profile clicked...');
        this.props.navigation.navigate('Profile');
    }
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch'
    }
});