import { ReactElement } from "react";
import { useQuery } from "./QueryContext";

const navigationItems = [
    {
        name: "Top results",
        link: "#"
    },
    {
        name: "Artists",
        link: "#artists"
    },
    {
        name: "Albums",
        link: "#albums"
    },
    {
        name: "Tracks",
        link: "#tracks"
    }
]

/** Header and navigation bar for search results page */
export function QueryHeader(): ReactElement {
    const query = useQuery();
    if (query.length === 0) {
        return <div></div>
    }
    return (
        <div className="search__queryHeader">
            <div className="container">
                <h1 className="search__queryTitle">Search results for "{query}"</h1>
                <ul className="search__nav">
                    {navigationItems.map((item, index) => {
                        const itemClassName = `search__navItem ${index === 0 ? 'search__navItemActive' : ''}`;
                        return (
                            <li key={index}>
                                <a href={item.link} className={itemClassName}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}