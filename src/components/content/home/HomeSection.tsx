import { ReactElement } from "react";

/** Represents a home page partition */
export function HomeSection(props: { heading: String, children: ReactElement }): ReactElement {
    return (
        <div className="main__section">
            <h2 className="main__sectionHeading">{props.heading}</h2>
            {props.children}
        </div>
    )
}