import { useEffect, useState } from "react";
import { QueryHeader } from "./QueryHeader";
import { QueryContext } from "./QueryContext";
import { SearchForm } from "./SearchForm";
import { Tracks } from "./Tracks";
import { GridSearchResults } from "./GridSearchResults";
import { searchForContent } from "../../../api/search";
import { IError, ISearchResult } from "../../../interfaces";
import { ErrorPage } from "../ErrorPage";


/** Search page */
export function Search() {
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<IError>({ status: false, message: '' })
    const [searchResults, setSearchResults] = useState<ISearchResult>({ artists: [], tracks: [], albums: [] });

    const handleSearch = (text: string) => {
        setQuery(text);

    }
    useEffect(() => {
        if (query.length > 0) {
            searchForContent(query)
                .then((result) => {
                    setError({ status: false, message: '' });
                    setSearchResults(result)
                })
                .catch(error => setError({ status: true, message: error.message }))
        }
    }, [query]);

    return (
        error.status
            ? <ErrorPage message={error.message}></ErrorPage>
            : <QueryContext.Provider value={query}>
                <QueryHeader></QueryHeader>
                <div className="container search__contentContainer">
                    <SearchForm onSubmit={handleSearch}></SearchForm>
                    <div className="results_container">
                        <GridSearchResults content={searchResults.artists} sectionTitle="Artists" sectionID="artists"></GridSearchResults>
                        <GridSearchResults content={searchResults.albums} sectionTitle="Albums" sectionID="albums"></GridSearchResults>
                        <Tracks content={searchResults.tracks}></Tracks>
                    </div>
                </div>
            </QueryContext.Provider>
    )
}
