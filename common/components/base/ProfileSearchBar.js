import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { CommonStyles } from '../ui-helpers/CommonStyles';
import { AppColors } from '../ui-helpers/Colors';

export class ProfileSearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }
    
    render() {
        const { search } = this.state;

        return (
            <View style={CommonStyles.header}>
                <SearchBar
                    style={styles.searchBar}
                    placeholder='Type to search...'
                    onChangeText={this.updateSearch}
                    value={search}/>
            </View>
        );
    }

    updateSearch = (search) => {
        console.log('New search: ' + search)
        this.setState({ search });
    }
}

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        backgroundColor: AppColors.backgroundPrimary,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        alignSelf: 'stretch',
        borderColor: 'transparent', 
        borderWidth: 0
    }
});