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

        this.searchBarRef = React.createRef();
    }
    
    render() {
        const { search } = this.state;

        return (
            <View style={CommonStyles.header}>
                <SearchBar
                    ref={this.searchBarRef}
                    style={styles.searchBar}
                    placeholder='Type to search...'
                    onChangeText={this._updateSearch}
                    value={search}/>
            </View>
        );
    }

    _showKeyboard() {
        this.searchBarRef.current.focus();
    }

    _updateSearch = (search) => {
        console.log('New search: ' + search)
        this.setState({ search });
        this.props.onSearchComplete?.(search);
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