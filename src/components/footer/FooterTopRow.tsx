import { ReactElement } from "react";
import { IFooterColumn } from "../../interfaces";
import { FooterColumn } from "./FooterColumn";



const footerColumns: IFooterColumn[] = [
    {
        title: "COMPANY",
        content: ["About Last.fm", "Contact Us", "Jobs"]
    },
    {
        title: "HELP",
        content: ["Track My Music", "Community Support", "Community Guidelines", "help"]
    },
    {
        title: "GOODIES",
        content: ["Download Scrobbler", "Developer API", "Free Music Downloads", "Merchandise"]
    },
    {
        title: "ACCOUNT",
        content: ["Inbox", "Settings", "Last.fm Pro", "Logout"]
    },
    {
        title: "FOLLOW US",
        content: ["Facebook", "Twitter", "Instagram", "YouTube"]
    }
]

export function FooterTopRow(): ReactElement {
    return (
        <div className="footer__top">
            <div className="container">
                <div className="footer__row">
                    {footerColumns.map((column, index) => {
                        return (
                            <FooterColumn key={index} title={column.title} content={column.content} ></FooterColumn>
                        );
                    })}
                </div>
            </div>
        </div>

    )
}