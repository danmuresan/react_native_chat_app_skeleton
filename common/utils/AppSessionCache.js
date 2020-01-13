const cache = [];

const AppSessionCache = {
    setItem(key, value) {
        //const serializedValue = checkIfIsStringType(value) ? value : JSON.stringify(value);
        cache.push({
            key: key,
            value: JSON.stringify(value)
        });
    },

    getItem(key, defaultValue) {
        try {
            //console.log('Looking up session cache for value with key ' + key)
            const cacheItem = cache.find(cacheItem => cacheItem.key === key);
            if (cacheItem) {
                //console.log('Session cache hit for value with key ' + key + '(value: ' + cacheItem.value + ')');
                return JSON.parse(cacheItem.value);
            } else {
                //console.log('Session cache miss for value with key ' + key + '. Returning default');
                return defaultValue;
            }
        } catch(err) {
            console.log('Failed to lookup cache for value with key ' + key + '. Returning default');
            return defaultValue;
        }
    }
}

function checkIfIsStringType(s) {
    return (s && typeof s.valueOf() === "string");
}

export default AppSessionCache;