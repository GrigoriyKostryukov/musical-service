import { ReactElement } from "react"

export function HeaderNavList(): ReactElement {
    const navigationItems = ['Home', 'Live', 'Misic', 'Charts', 'Events', 'Features'];
    return (
        <ul className="header__navList">
            {
                navigationItems.map((itemName, index) => {
                    return (
                        <li key={index} className="header__navItem">
                            <a href="/" className="link">{itemName}</a>
                        </li>
                    );
                }
                )}
        </ul>
    )
}