import { ReactElement } from "react";
import { HeaderNavList } from "./HeaderNavList";
import { Player } from "./Player";

export function Header(): ReactElement {
    return (
        <header className="header">
            <Player></Player>
            <div className="header__logoArea">
                <a href="#">
                    <img src="/images/logo.png" />
                </a>
            </div>
            <div className="header__nav">
                <button type="button" className="header__playerButton " id="header_search_button">
                    <a href="/search">
                        <img src="images/icon_search.svg" className="header__searchIcon" />
                    </a>
                </button>
                <HeaderNavList></HeaderNavList>
                <a href="#">
                    <img className="header__avatar" src="/images/user_avatar_default.png" />
                </a>
            </div>

        </header>
    )

}
