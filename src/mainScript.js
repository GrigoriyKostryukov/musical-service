import { showSearchPage } from "./searchPage.js"
import { showTopPage } from "./topPage.js"

showTopPage();
const searchButton = document.getElementById('header_search_button');
searchButton.addEventListener('click', () => {
    showSearchPage();
});
