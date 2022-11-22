/** Common functions for all pages */
export {
    requestData, createElementWithClass, findImageBySize, createErrorMessage,
};

const API_KEY = '8e8383c971760b356ba7b3757e7c44e9';
const SERVICE_ENDPOINT = 'https://ws.audioscrobbler.com/2.0/';
const DEFAULT_IMAGE_URL = 'images/default.png';

/**
 * Creates an element of specified type that has the given class
 * @param {string} tag type of the element
 * @param {string} className the class name of the element
 * @returns {HTMLElement}
*/
function createElementWithClass(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

/**
 * Fetches data from the service
 * @param {Object} params query params
 * @returns JSON representation of the response
 * @throws {Error} if the request was not successfull
*/
async function requestData(params = {}) {
    const searchParams = new URLSearchParams(
        {
            ...params,
            api_key: API_KEY,
            format: 'json',
        },
);
    const response = await fetch(`${SERVICE_ENDPOINT}?${searchParams}`);
    if (!response.ok) {
        throw new Error('Cannot load data');
    }
    return await response.json();
}

/**
 * Finds the image of the specified size from the list of search result images
 * @param {Array} imagesList list of images
 * @param {string} desiredSize size of the image
 * @returns {string} image URL (or default image URL if nothing found)
 * @throws {Error} if the request was not successfull
*/
function findImageBySize(imagesList, desiredSize) {
    const foundImage = imagesList.find((image) => image.size === desiredSize);
    if (!foundImage['#text']) {
        return DEFAULT_IMAGE_URL;
    }
    return foundImage['#text'];
}

/**
 * Places an error message inside the element with given id
 * @param {string} sectionID id of the desired element
 * @param {string} errorMessage message to show inside the element
*/
function createErrorMessage(sectionID, errorMessage = 'Cannot load data') {
    const sectionContent = document.getElementById(sectionID);
    sectionContent.innerHTML = `
    <div>
        <span>${errorMessage}</span>
    </div>`;
}
