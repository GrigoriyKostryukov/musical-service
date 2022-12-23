import {
  requestData, createElementWithClass, findImageBySize, createErrorMessage,
} from './common.js';

export { showSearchPage };

/** Maximal amount of cards presented in each section */
const SEARCH_RESULTS_LIMIT = 10;

const SEARCH_PAGE_TEMPLATE = `
<div class="search__queryHeader">
</div>
<div class="container search__contentContainer">
  <form class="search__form">
    <input id="search_input" type="search" class="search__input" placeholder="Search for music..." />
    <button id="search_button" type="button" class="search__submit"></button>
  </form>
  <div class="results_container"></div>
</div>`;

const SEARCH_PAGE_CONTENT_TEMPLATE = `
<div class="search__section" id="artists">
  <h2 class="search__sectionHeader">Artists</h2>
  <div id="search_artists">
    <ul class="search__coversList search_results">
    </ul>
  </div>
</div>
<div class="search__section" id="albums">
  <h2 class="search__sectionHeader">Albums</h2>
  <div id="search_albums">
    <ul class="search__coversList search_results">
    </ul>
  </div>
</div>
<div class="search__section" id="tracks">
  <h2 class="search__sectionHeader">Tracks</h2>
  <div id="search_tracks">
    <ul class="search__tracksList search_results">
    </ul>
  </div>
</div>`;

/**
 * Checks if the list of search results is not empty
 * @param {Object} result search result
 * @returns {boolean} true if the result list is not empty
*/
function successfulSearch(result) {
  return result.results['opensearch:totalResults'] != 0;
}

/**
 * Finds the artists matching user's query
 * @param {string} query user's query
 * @returns {Array} list of matching artists
 * @throws {Error} if the request was not successfull or nothing is found
*/
async function searchForArtists(query) {
  const data = await requestData({
    method: 'artist.search',
    artist: query,
    limit: SEARCH_RESULTS_LIMIT,
  });
  if (!successfulSearch(data)) {
    throw new Error('No matching artists found');
  }
  return data.results.artistmatches.artist;
}

/**
 * Finds the tracks matching user's query
 * @param {string} query user's query
 * @returns {Array} list of matching tracks
 * @throws {Error} if the request was not successfull or nothing is found
*/
async function searchForTracks(query) {
  const data = await requestData({
    method: 'track.search',
    track: query,
    limit: SEARCH_RESULTS_LIMIT,
  });
  if (!successfulSearch(data)) {
    throw new Error('No matching tracks found');
  }
  return data.results.trackmatches.track;
}

/**
 * Finds the albums matching user's query
 * @param {string} query user's query
 * @returns {Array} list of matching albums
 * @throws {Error} if the request was not successfull or nothing is found
*/
async function searchForAlbums(query) {
  const data = await requestData({
    method: 'album.search',
    album: query,
    limit: SEARCH_RESULTS_LIMIT,
  });
  if (!successfulSearch(data)) {
    throw new Error('No matching albums found');
  }
  return data.results.albummatches.album;
}

/**
 * Creates grid card code for an album or an artist
 * @param {string} imageURL URL of the card image
 * @param {string} itemHeader card heading
 * @param {string} itemDescription card text
 * @returns {string} HTML code of the card
*/
function createSearchCard(imageURL, itemHeader, itemDescription) {
  return `
  <img src="${imageURL}" class="search__cover"/>
  <div class="search__gridItemInfo">
      <h3>${itemHeader}</h3>
      <p>${itemDescription}</p>
  </div>`;
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
 * Creates card code for a track
 * @param {Object} track track info
 * @returns {string} HTML code of the card
*/
function createSearchTrackCard(track) {
  const image = findImageBySize(track.image, 'small');

  return `
    <img src="${image}" class="search__trackAvatar">
    <h3 class="search__trackTitle">${track.name}</h3>
    <span class="search__trackArtist">${track.artist}</span>
    <span>${generateTrackDuration()}</span>`;
}

/**
 * Adds the list of artists matching the query to the search page
 * @param {string} query user's query
*/
async function addArtists(query) {
  try {
    const searchResults = await searchForArtists(query);
    const section = document.getElementById('artists');
    const uiList = section.querySelector('.search__coversList');
    searchResults.forEach((artist) => {
      const card = createElementWithClass('li', 'search__gridItem');
      card.innerHTML = createSearchCard(
        findImageBySize(artist.image, 'large'),
        artist.name,
        `${artist.listeners} listeners`,
);
      uiList.append(card);
    });
  } catch (error) {
    createErrorMessage('search_artists', error.message);
  }
}

/**
 * Adds the list of albums matching the query to the search page
 * @param {string} query user's query
*/
async function addAlbums(query) {
  try {
    const searchResults = await searchForAlbums(query);
    const section = document.getElementById('albums');
    const uiList = section.querySelector('.search__coversList');
    searchResults.forEach((album) => {
      const card = createElementWithClass('li', 'search__gridItem');
      card.innerHTML = createSearchCard(
        findImageBySize(album.image, 'large'),
        album.name,
        album.artist,
);
      uiList.append(card);
    });
  } catch (error) {
    createErrorMessage('search_albums', error.message);
  }
}

/**
 * Adds the list of tracks matching the query to the search page
 * @param {string} query user's query
*/
async function addTracks(query) {
  try {
    const searchResults = await searchForTracks(query);
    const section = document.getElementById('tracks');
    const uiList = section.querySelector('.search__tracksList');
    searchResults.forEach((track) => {
      const card = createElementWithClass('li', 'search__trackCard');
      card.innerHTML = createSearchTrackCard(track);
      uiList.append(card);
    });
  } catch (error) {
    createErrorMessage('search_tracks', error.message);
  }
}

/** Adds the header with query text and results navigation bar 
 * @param {string} query user's query
*/
function addSearchHeader(query) {
  const template = `
    <h1 class="search__queryTitle">Search results for "${query}"</h1>
    <ul class="search__nav">
      <li><a class="search__navItem search__navItemActive">Top results</a></li>
      <li><a class="search__navItem" href="#artists">Artists</a></li>
      <li><a class="search__navItem" href="#albums">Albums</a></li>
      <li><a class="search__navItem" href="#tracks">Tracks</a></li>
    </ul>`;

  const header = document.querySelector('.search__queryHeader');
  header.innerHTML = '';
  const headerContent = createElementWithClass('div', 'container');
  headerContent.innerHTML = template;
  header.append(headerContent);
}

/** Searches and fills the page with search results 
 * @param {string} query user's query
*/
async function fillSearchContent(query) {
  await Promise.all([
    addArtists(query),
    addAlbums(query),
    addTracks(query),
  ]);
}

/** Runs search */
function search() {
  const input = document.getElementById('search_input');
  if (!input.value) {
    return;
  }

  const content = document.getElementsByClassName('results_container')[0];
  content.innerHTML = SEARCH_PAGE_CONTENT_TEMPLATE;
  fillSearchContent(input.value);
  addSearchHeader(input.value);
}

function showSearchPage() {
  const content = document.getElementsByClassName('pageContent')[0];
  content.innerHTML = SEARCH_PAGE_TEMPLATE;
  const searchButton = document.getElementById('search_button');
  const input = document.getElementById('search_input');
  searchButton.addEventListener('click', search);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    }
  });
}
