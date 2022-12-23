import { useEffect, useState } from "react";
import { loadTopResults } from "../../../api/top";
import { IError, ITop } from "../../../interfaces";
import { ErrorPage } from "../ErrorPage";
import { ArtistsTop } from "./ArtistsTop";
import { HomeSection } from "./HomeSection";
import { TracksTop } from "./TracksTop";

/** Represents the top results page */
export function Home() {
    const [error, setError] = useState<IError>({ status: false, message: '' })
    const [searchResults, setSearchResults] = useState<ITop>({ artists: [], tracks: [] });

    useEffect(() => {
        loadTopResults()
            .then((result: ITop) => {
                setError({ status: false, message: '' });
                setSearchResults(result)
            })
            .catch((error) => setError({ status: true, message: error.message }))
    }, []);

    return (
        error.status
            ? <ErrorPage message={error.message}></ErrorPage>
            : <div className="container">
                <h1 className="main__heading">Music</h1>
                <HomeSection heading='Hot right now'>
                    <ArtistsTop artists={searchResults.artists}></ArtistsTop>
                </HomeSection>
                <HomeSection heading='Popular tracks'>
                    <TracksTop tracks={searchResults.tracks}></TracksTop>
                </HomeSection>
            </div>
    )
}