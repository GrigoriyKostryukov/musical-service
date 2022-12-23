import { ReactElement } from "react";

export function Player(): ReactElement {
    const controlButtons = ['images/player_previous.png', 'images/player_play.png', 'images/player_next.png', 'images/player_like.png'];
    return (
        <div className="header__player">
            <a href="#">
                <img src="/images/player_default_album.430223706b14.png" className="imageLink" />
            </a>

            <ul className="header__playerControls">
                {controlButtons.map((button, index) =>
                    <li key={index}><button  type="button" className="header__playerButton"><img src={button} /></button></li>)}
            </ul>
        </div>
    )
}