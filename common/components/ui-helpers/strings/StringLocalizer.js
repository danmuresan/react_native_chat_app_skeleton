import { NativeModules, Platform } from 'react-native'

const DefaultLocale = 'en';

const SanitizedLocales = ['en', 'ro']

const LocalizedStrings = {
    'en': require('./en/LocalizedStrings.json'),
    'ro': require('./ro/LocalizedStrings.json')
    // ... others will go here
}

export default function getLocalizedString(stringKey) {
    let locale = getCurrentLocale();
    if (!locale) {
        locale = DefaultLocale;
    }

    let localizedStringsFile = getLocalizedStringsForLocale(locale); 
    if (localizedStringsFile) {
        return localizedStringsFile[stringKey];
    }

    return '';
}

function getCurrentLocale() {
    // TODO: actually have some sort of logic here for fetching the locale
    let locale = DefaultLocale;
    Platform.select({
        ios: () => locale = NativeModules.SettingsManager.settings.AppleLocale, // "fr_FR"
        android: () => locale = NativeModules.I18nManager.localeIdentifier    // "fr_FR"
    });

    // TODO: Fetch from AsyncStorage ?? 
    locale = locale.split('_')[0].toLowerCase();
    console.log('Current locale: ' + locale);
    if (locale === undefined || locale === '' || !SanitizedLocales.includes(locale)) {
        return DefaultLocale;
    }

    return locale;
}

function getLocalizedStringsForLocale(locale) {
    const localizedStringsFileRaw = LocalizedStrings[locale];
    return localizedStringsFileRaw;
}