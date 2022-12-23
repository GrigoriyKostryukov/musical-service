import { ISearchResultCard } from "../../../interfaces";
import { SearchResultCard } from "./SearchResultCard";
import { SearchSection } from "./SearchSection";

/** Represents a list albums or artists on the search page */
export function GridSearchResults(props: { content: ISearchResultCard[], sectionTitle: string, sectionID: string }) {

    return (
        <SearchSection sectionID={props.sectionID} sectionTitle={props.sectionTitle}>
            {props.content.length === 0
                ? <span>Nothing found</span>
                : <ul className="search__coversList search_results">
                    {props.content.map((item, index) => <SearchResultCard key={index} item={item}></SearchResultCard>)}
                </ul>}
        </SearchSection>);
}