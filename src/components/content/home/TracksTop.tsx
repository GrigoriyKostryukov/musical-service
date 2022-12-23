import { ITrack } from "../../../interfaces";
import { TrackTopCard } from "./TrackTopCard";

/** Represents the top of tracks on the home page */
export function TracksTop(props: { tracks: ITrack[] }) {
    return (
        <div id="top_tracks">
                <ul className="main__trackList">
                    {props.tracks.map((track, index) => <TrackTopCard track={track} key={index}></TrackTopCard>)}
                </ul>
        </div>
    )
}