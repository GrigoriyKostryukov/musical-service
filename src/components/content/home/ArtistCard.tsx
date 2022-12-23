import { ReactElement } from "react";
import { IArtist } from "../../../interfaces";

/** Represents artist information on the home page */
export function ArtistCard(props: { artist: IArtist }): ReactElement {
    return (
        <li className="main__artistCard">
            <img src={props.artist.imageURL} className="main__artistImage" />
            <p className="main__artistName">{props.artist.name}</p>
            <ul className="main__genresList">
                {props.artist.tags.map((tag, index) => {
                    return (
                        <li key={index}>
                            <a className="main__genreTag" href={tag.url}>{tag.name}</a>
                        </li>);
                })}
            </ul>
        </li>
    )
}