import { AppConstants } from '../../../utils/AppConstants'
import AppSessionCache from '../../../utils/AppSessionCache'

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
    try {
        return AppSessionCache.getItem(AppConstants.CurrentLocaleCacheItemKey, DefaultLocale);
    } catch(err) {
        console.log('Something went wrong while getting current locale, ' + err);
        return DefaultLocale;
    }
}

function getLocalizedStringsForLocale(locale) {
    const localizedStringsFileRaw = LocalizedStrings[locale];
    return localizedStringsFileRaw;
}