
export const OptionType = Object.freeze({
    SETTINGS: 1,
    SHARE_PROFILE: 2,
    CHANGE_STATUS: 3,
    SEND_MESSAGE: 4,
    CALL: 5,
    REMOVE_CONTACT: 6
});

export function createContactOptionModel(text, iconName, type) {
    return {
        optionType: type,
        optionText: text,
        optionIconName: iconName
    };
}