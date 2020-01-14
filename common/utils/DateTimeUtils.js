export const DateTimeUtils = {
    pretifyDateForMessageBubble(timestamp) {
        if (DateTimeUtils.isToday(timestamp)) {
            let hoursString = timestamp.getHours() < 10 ? '0' + timestamp.getHours() : timestamp.getHours();
            let minsString = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes();
            return hoursString + ':' + minsString;
        }

        if (DateTimeUtils.isYesterday(timestamp)) {
            return "Yesterday";
        }

        // TODO: should care about locale when formatting
        return new Date(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    },

    isToday(someDate) {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    },

    isYesterday(someDate) {
        const yesterday = new Date(someDate.setDate(someDate.getDate() - 1));

        return someDate.getDate() == yesterday.getDate() &&
            someDate.getMonth() == yesterday.getMonth() &&
            someDate.getFullYear() == yesterday.getFullYear()
    }
}