import { ReactElement } from "react"
import { IArtist } from "../../../interfaces";
import { ArtistCard } from "./ArtistCard";

/** Represents top of artists on the home page */
export function ArtistsTop(props: { artists: IArtist[] }): ReactElement {
    return (<div id="top_artists">
        <ul className="main__artists">
            {props.artists.map((artist, index) => <ArtistCard artist={artist} key={index}></ArtistCard>)}
        </ul>
    </div>)
}