import { ReactElement } from 'react'
import { ISearchResultTrackCard } from "../../../interfaces"

/** Represents track card on the search page */
export function TrackCard(props: { item: ISearchResultTrackCard }): ReactElement {
    return (
        <li className='search__trackCard'>
            <img src={props.item.imageURL} className="search__trackAvatar" />
            <h3 className="search__trackTitle">{props.item.name}</h3>
            <span className="search__trackArtist">{props.item.artist}</span>
            <span>{props.item.duration}</span>
        </li>
    );

}