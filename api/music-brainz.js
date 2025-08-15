import { MusicBrainzApi } from 'musicbrainz-api';

const config = {
    baseUrl: 'https://musicbrainz.org',
    appName: 'my-app',
    appVersion: '0.1.0',
    appMail: 'user@mail.org',
    disableRateLimiting: false,
};

const mbApi = new MusicBrainzApi(config);

function formatedTime(ms) {
    if (!ms) return 'N/A';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function getArtistData(artistName) {
    try {
        const searchResult = await mbApi.search('artist', { query: artistName });

        if (!searchResult.artists.length) {
            return { error: 'No artist found' };
        }

        const artist = searchResult.artists[0];

        const artistInfo = {
            name: artist.name,
            gender: artist.gender || 'N/A',
            disambiguation: artist.disambiguation || 'N/A',
            country: artist.country || 'N/A',
            mbid: artist.id,
            beginDate: artist.begin,
            ifDead: artist.end
        };

        return { artist: artistInfo };

    } catch (err) {
        return { error: err.message };
    }
}



async function searchSongByTitle(songTitle) {
    try {
        const result = await mbApi.search('recording', { query: songTitle });

        if (!result.recordings.length) {
            return { error: 'No songs found' };
        }


        const songs = result.recordings.map(rec => ({
            title: rec.title,
            mbid: rec.id,
            artist: rec['artist-credit'].map(ac => ac.name).join(', '),
            length: formatedTime(rec.length)
        }));

        return { songs };

    } catch (err) {
        return { error: err.message };
    }
}


