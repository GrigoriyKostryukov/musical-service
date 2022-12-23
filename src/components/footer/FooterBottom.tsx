import { ReactElement } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { LegalInfo } from "./LegalInfo";

export function FooterBottom(): ReactElement {
    return (
        <div className="footer__bottom">
            <div className="container">
                <LanguageSelector selectedIndex={0}></LanguageSelector>
                <a className="link" href="#">Time zone: <strong>Europe/Moscow</strong></a>
                <LegalInfo></LegalInfo>
            </div>
        </div>
    );
}
