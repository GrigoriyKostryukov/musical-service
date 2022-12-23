import { ISearchResultTrackCard } from "../../../interfaces";
import { SearchSection } from "./SearchSection";
import { TrackCard } from "./TrackCard";

/** Represents a list of tracks on the search page */
export function Tracks(props: { content: ISearchResultTrackCard[]}) {
    return (
        <SearchSection sectionTitle="Tracks" sectionID="tracks">
            {props.content.length === 0
                ? <span>Nothing found</span>
                : <ul className="search__tracksList search_results">
                    {props.content.map((item, index) => <TrackCard key={index} item={item}></TrackCard>)}
                </ul>}
        </SearchSection>
    );
}