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

        // without binding, we don't have state in the callbacks
        this.onNotificationsIconClicked = this.onNotificationsIconClicked.bind(this);
        this.onSearchIconClicked = this.onSearchIconClicked.bind(this);
        this.onProfileIconClicked = this.onProfileIconClicked.bind(this);
        this.onSearchComplete = this.onSearchComplete.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.isSearchActive) {
                this.state.isSearchActive = false;
                this.onSearchComplete(undefined);
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
                    <ProfileSearchBar ref={this.searchBarRef} onSearchComplete={this.onSearchComplete}/>
                </View>          
            );
        }

        return (
            <Header 
                style={CommonStyles.header}
                placement='center'
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={<ClickableIconView iconName='notifications' iconColor={AppColors.buttonPrimary} onIconClicked={this.onNotificationsIconClicked} />}
                centerComponent={<ProfileDrawerView onProfileClicked={this.onProfileIconClicked}/>}
                rightComponent={<ClickableIconView iconName='search' iconColor={AppColors.buttonPrimary} onIconClicked={this.onSearchIconClicked} />}
            />            
        );
    }

    onSearchComplete(searchPhrase) {
        this.props.onSearchComplete?.(searchPhrase);
    }

    onNotificationsIconClicked() {
        console.log('Notifications clicked...');
    }

    onSearchIconClicked() {
        console.log('Search clicked...');
        this.state.isSearchActive = true;
        // this.searchBarRef.current.showKeyboard();
        this.setState(this.state);
    }

    onProfileIconClicked() {
        console.log('Profile clicked...');
        this.props.navigation.navigate('Profile');
    }
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch'
    }
});