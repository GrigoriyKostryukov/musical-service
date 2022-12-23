import { ReactElement } from "react";
import { IFooterColumn } from "../../interfaces";

export function FooterColumn(props: IFooterColumn): ReactElement {
    return (
        <div className="footer__column" >
            <h2 className="footer__heading">{props.title}</h2>
            <ul className="footer__linkList">
                {props.content.map((item, index) =>
                    <li key={index}><a href="#" className="link">{item}</a></li>
                )}
            </ul>
        </div>
    )
}