import { ReactElement } from "react";
import { FooterBottom } from "./FooterBottom";
import { FooterTopRow } from "./FooterTopRow";

export function Footer(): ReactElement {
    return (
        <footer className="footer">
                <FooterTopRow></FooterTopRow>
                <FooterBottom></FooterBottom>
        </footer>
    )
}