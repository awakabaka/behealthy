import en from './assets/i18n/en.json'
import ua from './assets/i18n/ua.json'

import VueI18n from  'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n);

const dateTimeFormats = {
    'en': {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        },
        newType: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
    },
    'ua': {
        short: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        },
        newType: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
    }
}

export default new VueI18n({
    dateTimeFormats,
    locale: localStorage.lang || 'en',
    messages: {
        en: en,
        ua: ua
    }
})