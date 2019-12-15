import { StyleSheet } from 'react-native'
import { AppColors } from './Colors'

export const CommonStyles = StyleSheet.create({
    header: {
        color: AppColors.appBrand
    },
    headerText: {
        color: AppColors.buttonPrimary,
        fontSize: 20
    },
    base: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})