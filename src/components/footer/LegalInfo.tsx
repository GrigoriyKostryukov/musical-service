import { ReactElement } from "react";

const links = ['Terms of Use', 'Privacy Policy', 'Legal Policies', 'Cookies Policy', 'Cookie Information', 'Jobs at ViacomCBS', 'Last.fm Music']

export function LegalInfo(): ReactElement {
    return (
        <ul className="footer__legalInfo">
            <li key={0}><span className="footer__legalItem">CBS Interactive © 2022 Last.fm Ltd. All rights reserved</span></li>
            {links.map((linkText, index) => {
                return (
                    <li key={index + 1}>
                        <a href="#" className="link linkHoverUnderlined footer__legalItem">{linkText}</a>
                    </li>
                )
            })}
        </ul>
    )
}