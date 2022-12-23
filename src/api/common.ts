const API_KEY = '8e8383c971760b356ba7b3757e7c44e9';
const SERVICE_ENDPOINT = 'https://ws.audioscrobbler.com/2.0/';
const DEFAULT_IMAGE_URL = '/images/default.png';

/** Common functions for all pages */
export {
    requestData, findImageBySize
};

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
    return response.json();
}

/**
 * Finds the image of the specified size from the list of search result images
 * @param imagesList list of images
 * @param desiredSize size of the image
 * @returns  image URL (or default image URL if nothing found)
*/
function findImageBySize(imagesList: any, desiredSize: string): string {
    const foundImage = imagesList.find((image: any) => image.size === desiredSize);
    if (!foundImage['#text']) {
        return DEFAULT_IMAGE_URL;
    }
    return foundImage['#text'];
}

