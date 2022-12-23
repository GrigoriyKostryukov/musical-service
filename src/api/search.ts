import { ISearchResult, ISearchResultCard, ISearchResultTrackCard } from "../interfaces";
import { findImageBySize, requestData } from "./common";
export { searchForContent }

/** Maximal amount of cards presented in each section */
const SEARCH_RESULTS_LIMIT = 10;

/** Checks if the search result is not empty */
function successfulSearch(result: any) {
    return result.results['opensearch:totalResults'] !== 0;
}

/**
 * Finds the artists matching user's query
 * @param query user's query
 * @returns list of matching artists
*/
async function searchForArtists(query: string) {
    const data = await requestData({
        method: 'artist.search',
        artist: query,
        limit: SEARCH_RESULTS_LIMIT,
    });
    if (!successfulSearch(data)) {
        return [];
    }
    const artists = data.results.artistmatches.artist;
    return artists.map((artist: any) => {
        return {
            imageURL: findImageBySize(artist.image, 'large'),
            name: artist.name,
            description: `${artist.listeners} listeners`
        }
    })
}

/**
 * Finds the tracks matching user's query
 * @param query user's query
 * @returns list of matching tracks
*/
async function searchForTracks(query: string): Promise<ISearchResultTrackCard[]> {
    const data = await requestData({
        method: 'track.search',
        track: query,
        limit: SEARCH_RESULTS_LIMIT,
    });
    if (!successfulSearch(data)) {
        return [];
    }
    const tracks = data.results.trackmatches.track;
    return tracks.map((track: any) => {
        return {
            imageURL: findImageBySize(track.image, 'large'),
            name: track.name,
            artist: track.artist,
            duration: generateTrackDuration()
        }
    })
}

/**
* Finds the albums matching user's query
* @param query user's query
* @returns list of matching albums
*/
async function searchForAlbums(query: string): Promise<ISearchResultCard[]> {
    const data = await requestData({
        method: 'album.search',
        album: query,
        limit: SEARCH_RESULTS_LIMIT,
    });
    if (!successfulSearch(data)) {
        return [];
    }
    const albums = data.results.albummatches.album;
    return albums.map((album: any) => {
        return {
            imageURL: findImageBySize(album.image, 'large'),
            name: album.name,
            description: album.artist
        }
    })
}

/** Mocks track duration.
 * Last.fm API does not provide any duration info
*/
function generateTrackDuration() {
    const minutes = Math.floor(Math.random() * 5 + 1);
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${Math.floor(seconds / 10)}${seconds % 10}`;
}

/**
* Search for user's query matches
* @param query user's query
*/
async function searchForContent(query: string): Promise<ISearchResult> {
    const [albums, tracks, artists] = await Promise.all([searchForAlbums(query), searchForTracks(query), searchForArtists(query)])
    return {
        albums: albums,
        tracks: tracks,
        artists: artists
    }
}
