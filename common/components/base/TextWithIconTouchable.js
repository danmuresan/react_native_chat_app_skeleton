import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { AppColors } from '../ui-helpers/Colors'
import PropTypes from 'prop-types'

export class TextWithIconTouchable extends React.Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            iconName: PropTypes.string,
            text: PropTypes.string
        };

        this.onPressed = this.onPressed.bind(this);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPressed}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Icon name={this.props.iconName}/>
                    </View>
                    <Text style={styles.text}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    onPressed() {
        this.props.onPress?.();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    icon: {
        flex: 0.15,
        color: AppColors.textColorPrimary,
        marginStart: 8,
        marginEnd: 8,
        marginTop: 16,
        marginBottom: 16,
        justifyContent: 'flex-start'
    },
    text: {
        textAlign: "left",
        fontWeight: "bold",
        textAlignVertical: "center",
        color: AppColors.textColorPrimary,
        marginTop: 16,
        marginBottom: 16,
        marginEnd: 8
    }
});
