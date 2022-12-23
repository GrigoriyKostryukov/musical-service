import { ReactElement } from "react";
export type {
    IFooterColumn, IArtist, ITag, ITrack, ISearchResult,
    ISearchResultCard, ISearchSectionProps, ITop, IError, ISearchResultTrackCard
};

/** Footer partition */
interface IFooterColumn {
    title: string,
    content: string[]
}

/** Top artist description */
interface IArtist {
    name: string,
    tags: ITag[],
    imageURL: string
}

interface ITag {
    name: string,
    url: string
}

interface ITrack {
    name: string,
    imageURL: string,
    artist: string,
    tags: ITag[]
}

/** Search page section parameters */
interface ISearchSectionProps {
    children: ReactElement,
    sectionTitle: string,
    sectionID: string

}

/** Parameters of artist or album search item */
interface ISearchResultCard {
    name: string,
    imageURL: string,
    description: string
}

/** Parameters of track search item */
interface ISearchResultTrackCard {
    name: string,
    imageURL: string,
    artist: string,
    duration: string
}

interface IError {
    status: boolean,
    message: string
}

/** All search results */
interface ISearchResult {
    artists: ISearchResultCard[]
    albums: ISearchResultCard[]
    tracks: ISearchResultTrackCard[]
}

/** Top results */
interface ITop {
    artists: IArtist[],
    tracks: ITrack[]
}