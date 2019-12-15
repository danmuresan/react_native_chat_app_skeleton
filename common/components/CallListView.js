import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements';
import { AppColors } from '../components/ui-helpers/Colors'
import { CommonStyles } from '../components/ui-helpers/CommonStyles'
import timeout from '../utils/AsyncUtils'
import { FullScreenLoadingSpinnerView } from '../components/base/FullScreenLoadingSpinnerView'
import { CommonHeaderView } from './base/CommonHeaderView';

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
                <CommonHeaderView pageTitle='Calls' />
                <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlignVertical: 'center'}}>
                    No call data available yet!
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