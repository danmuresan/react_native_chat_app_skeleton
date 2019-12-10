import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class SimpleChatListItem extends Component {
    render() {
        return (
            <View>
                <Image 
                    style={styles.itemImage}
                    source={{uri: this.props.avatarUri}}/>
                <Text
                    style={styles.itemText}>
                    {this.props.contactName}
                </Text>
            </View>
        );
    }
}

SimpleChatListItem.propTypes = {

};

const styles = StyleSheet.create({
    itemImage: {
        width: 50,
        height: 50
    },
    itemText: {
        color: 'red'    // TODO: change this
    }
}); 