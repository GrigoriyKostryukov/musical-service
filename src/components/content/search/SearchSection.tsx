import { ReactElement } from "react";
import { ISearchSectionProps } from "../../../interfaces";
import { useQuery } from "./QueryContext";

/** Represents a partition of the search page */
export function SearchSection(props: ISearchSectionProps): ReactElement {
    const query = useQuery();
    if (query.length === 0) {
        return <div></div>
    }
    return (
        <div className="search__section" id={props.sectionID}>
            <h2 className="search__sectionHeader">{props.sectionTitle}</h2>
            {props.children}
        </div>
    );
}