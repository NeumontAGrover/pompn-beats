import { MusicBrainzApi } from 'musicbrainz-api';

const config = {
    baseUrl: 'https://musicbrainz.org',

    appName: 'my-app',
    appVersion: '0.1.0',
    appMail: 'user@mail.org',
    
    disableRateLimiting: false,
};

const mbApi = new MusicBrainzApi(config);
