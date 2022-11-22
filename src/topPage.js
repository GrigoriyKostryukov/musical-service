import {
    requestData, createElementWithClass, findImageBySize, createErrorMessage
} from './common.js';

export { showTopPage }

/** Maxial number of displayed tracks */
const TOP_ARTISTS_LIMIT = 12;

/** Maxial number of displayed tracks */
const TOP_TRACKS_LIMIT = 18;

/** Maxial number of tags displayed in a card */
const MAX_TAGS_NUMBER = 3;

const TOP_PAGE_TEMPLATE = `
    <div class="container">
        <h1 class="main__heading">Music</h1>
        <div class="main__section">
            <h2 class="main__sectionHeading">Hot right now</h2>
            <div id="top_artists">
                <ul class="main__artists">
                </ul>
            </div>
        </div>
        <div class="main__section">
            <h2 class="main__sectionHeading">PopularTracks</h2>
            <div id="top_tracks">
                <ul class="main__trackList">
                </ul>
            </div>
        </div>
    </div>`;

/**
 * Creates card code for an artist
 * @param {Object} artist artist info
 * @returns {string} HTML code of the card
*/
function createArtistCard(artist) {
    const image = findImageBySize(artist.image, 'large');
    const template = `
        <img src="${image}" class="main__artistImage" />
        <p class="main__artistName">${artist.name}</p>
        <ul class="main__genresList">
        </ul>`;
    return template;
}

/** 
 * Fetches top artists 
 * @returns {Array} list of top atrists
 */
async function loadTopArtists() {
    const data = await requestData({
        method: 'chart.gettopartists',
        limit: TOP_ARTISTS_LIMIT
    });
    return data.artists.artist;
}

/** 
 * Fetches top tags of the given artist
 * @param {string} artistName name of the artist
 * @returns {Array} list of top tags
 */
async function loadArtistTopTags(artistName) {
    const data = await requestData({
        method: 'artist.gettoptags',
        artist: artistName
    });
    return data.toptags.tag;
}

/** 
 * Fetches top tags of the given artist
 * @param {string} artistName name of the track's author
 * @param {string} trackName name of the track
 * @returns {Array} list of top track tags
 */
async function loadTrackTags(artistName, trackName) {
    const data = await requestData({
        method: 'track.gettoptags',
        artist: artistName,
        track: trackName
    });
    return data.toptags.tag;
}

/** 
 * Adds the list of tags to the given card element
 * @param {HTMLElement} cardElement card to add tags
 * @param {Array} tags list of tags
 */
function addTagsToCard(cardElement, tags) {
    let tagsToDisplay = tags.slice(0, MAX_TAGS_NUMBER);
    const tagList = cardElement.getElementsByClassName('main__genresList')[0];
    tagsToDisplay.forEach((tag) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="main__genreTag" href="${tag.url}">${tag.name}</a>`;
        tagList.append(listItem);
    });
}

/** 
 * Fetches top tracks 
 * @returns {Array} list of top tracks
 */
async function loadTopTracks() {
    const data = await requestData({
        method: 'chart.gettoptracks',
        limit: TOP_TRACKS_LIMIT
    });
    return data.tracks.track;
}

/**
 * Creates card code for a track
 * @param {Object} track track info
 * @returns {string} HTML code of the card
*/
function createTrackCard(track) {
    const image = findImageBySize(track.image, 'medium');
    return `
    <img src="${image}" class="main__trackCover" />
    <div class="main__trackInfo">
        <h4 class="main__trackName">${track.name}</h4>
        <a href="/" class="main__trackArtistName">${track.artist.name}</a>
        <ul class="main__genresList">
        </ul>
    </div>`;
}

/** Adds the list of top artists to the main page */
async function addTopArtists() {
    try {
        const artists = await loadTopArtists();
        const artistsUIList = document.querySelector('.main__artists');
        artists.forEach(async (artist) => {
            const element = createElementWithClass('li', 'main__artistCard');
            element.innerHTML = createArtistCard(artist);
            const topTags = await loadArtistTopTags(artist.name);
            addTagsToCard(element, topTags);
            artistsUIList.append(element);
        });
    }
    catch (error) {
        createErrorMessage('top_artists');
    }
}

/** Adds the list of top tracks to the main page */
async function addTopTracks() {
    try {
        const tracks = await loadTopTracks();
        const tracksUIList = document.querySelector('.main__trackList');
        tracks.forEach(async (track) => {
            const element = createElementWithClass('li', 'main__trackCard');
            element.innerHTML = createTrackCard(track);
            const topTags = await loadTrackTags(track.artist.name, track.name);
            addTagsToCard(element, topTags);
            tracksUIList.append(element);
        });
    }
    catch (error) {
        createErrorMessage('top_tracks');
    }
}

/** Searches and fills the page with top results */
async function fillContent() {
    await Promise.all([addTopTracks(), addTopArtists()]);
}

function showTopPage() {
    const content = document.getElementsByClassName('pageContent')[0];
    content.innerHTML = TOP_PAGE_TEMPLATE;
    fillContent();
}
