import { ReactElement } from 'react'
import { ISearchResultCard } from "../../../interfaces";

/** Represents album or artist card on the search page */
export function SearchResultCard(props: { item: ISearchResultCard }): ReactElement {
    return (
        <li className="search__gridItem">
            <img src={props.item.imageURL} className="search__cover" />
            <div className="search__gridItemInfo">
                <h3>{props.item.name}</h3>
                <p>{props.item.description}</p>
            </div>
        </li>
    );
}