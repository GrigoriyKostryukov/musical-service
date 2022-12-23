import { ReactElement } from "react";
import { ITrack } from "../../../interfaces";

/** Represents a track on the home page */
export function TrackTopCard(props: { track: ITrack }): ReactElement {
    return (
        <li className="main__trackCard">
            <img src={props.track.imageURL} className="main__trackCover" />
            <div className="main__trackInfo">
                <h4 className="main__trackName">{props.track.name}</h4>
                <a href="/" className="main__trackArtistName">{props.track.artist}</a>
                <ul className="main__genresList">
                    {props.track.tags.map((tag, index) => {
                        return (
                            <li key={index}>
                                <a className="main__genreTag" href={tag.url}>{tag.name}</a>
                            </li>);
                    })}
                </ul>
            </div>
        </li>
    )
}