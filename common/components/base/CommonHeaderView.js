import React from 'react'
import { Header } from 'react-native-elements';
import { AppColors } from '../ui-helpers/Colors'
import { CommonStyles } from '../ui-helpers/CommonStyles'

export class CommonHeaderView extends React.Component {
    
    render() {
        return (
            <Header 
                style={CommonStyles.header}
                placement='left'
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'menu', color: AppColors.buttonPrimary, onPress: this.onHamburgerIconPressed }}
                centerComponent={{ text: this.props.pageTitle, style: CommonStyles.headerText }}
                rightComponent={{ icon: 'person', color: AppColors.buttonPrimary, onPress: this.onProfileIconPressed }}
            />
        );
    }

    onHamburgerIconPressed() {
        console.log('Hamburger pressed...');
    }

    onProfileIconPressed() {
        console.log('Profile pressed...');
    }
}