import React from 'react'
import { View, Text } from 'react-native'
import { CommonStyles } from '../components/ui-helpers/CommonStyles'
import timeout from '../utils/AsyncUtils'
import { FullScreenLoadingSpinnerView } from '../components/base/FullScreenLoadingSpinnerView'
import { CommonHeaderView } from './base/CommonHeaderView';
import getLocalizedString from '../components/ui-helpers/strings/StringLocalizer'

export default class CallListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            callListData: []
        };
    }

    async componentDidMount() {
        await this.loadDataAsync();
        this.setState(this.state);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <FullScreenLoadingSpinnerView />
            )
        }
        return (
            <View style={CommonStyles.base}>
                <CommonHeaderView 
                    pageTitle={getLocalizedString('Calls')}
                    navigation={this.props.navigation} />
                <Text style={CommonStyles.centerVerticalHorizontalText}>
                    {getLocalizedString('NoCallDataLabel')}
                </Text>
            </View>
        )
    }

    async loadDataAsync() {
         // TODO: load up from somewhere
         await timeout(200);    
         this.state.isLoading = false;    
    }
}