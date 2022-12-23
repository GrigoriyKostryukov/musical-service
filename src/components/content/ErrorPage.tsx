import { ReactElement } from "react";

export function ErrorPage(props: { message: string}): ReactElement {
    return (<div className="container">
        <h1 className="main__heading">Error</h1>
        <h2 className="main__sectionHeading">{props.message}</h2>
    </div>);
    }