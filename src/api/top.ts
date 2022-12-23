import { IArtist, ITop, ITrack } from "../interfaces";
import { findImageBySize, requestData } from "./common";
export { loadTopResults }
/** Maximal number of displayed tracks */
const TOP_ARTISTS_LIMIT = 12;

/** Maximal number of displayed tracks */
const TOP_TRACKS_LIMIT = 18;

/** Maxial number of tags displayed in a card */
const MAX_TAGS_NUMBER = 3;

/** 
 * Fetches top artists 
 * @returns list of top atrists
 */
async function loadTopArtists(): Promise<IArtist[]> {
    const data = await requestData({
        method: 'chart.gettopartists',
        limit: TOP_ARTISTS_LIMIT
    });
    const topList = data.artists.artist
    return topList.map((artist: any) => {
        return {
            name: artist.name,
            imageURL: findImageBySize(artist.image, 'large'),
            tags: []
        }
    })
}

/** 
 * Fetches top tracks
 * @returns list of top tracks
 */
async function loadTopTracks(): Promise<ITrack[]> {
    const data = await requestData({
        method: 'chart.gettoptracks',
        limit: TOP_TRACKS_LIMIT
    });
    const topList = data.tracks.track
    return topList.map((track: any) => {
        return {
            name: track.name,
            artist: track.artist.name,
            imageURL: findImageBySize(track.image, 'small'),
            tags: []
        }
    })
}

async function loadTracksWithTags(): Promise<ITrack[]> {
    const tracks = await loadTopTracks();
    return Promise.all(
        tracks.map(async (track) => {
            const data = await requestData({
                method: 'artist.gettoptags',
                artist: track.artist,
                name: track.name
            });
            const topTags = data.toptags.tag;
            return {
                ...track, tags: topTags.slice(0, MAX_TAGS_NUMBER)
            };
        }
        )
    );
}

async function loadArtistsWithTags(): Promise<IArtist[]> {
    const artists = await loadTopArtists();
    return Promise.all(
        artists.map(async (artist) => {
            const data = await requestData({
                method: 'artist.gettoptags',
                artist: artist.name
            });
            const topTags = data.toptags.tag;
            return {
                ...artist, tags: topTags.slice(0, MAX_TAGS_NUMBER)
            };
        }
        )
    );
}

/** Fetches all top results */
async function loadTopResults(): Promise<ITop> {
    const [artists, tracks] = await Promise.all([loadArtistsWithTags(), loadTracksWithTags()])
    return {
        artists: artists,
        tracks: tracks
    }

}
