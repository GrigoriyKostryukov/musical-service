import { ReactElement } from "react";

const languages = ['English', 'Deutsch', 'Español', 'Français', 'Italiano', '日本語', 'Polski', 'Português', 'Русский', 'Svenska', '简体中文']

export function LanguageSelector(props: { selectedIndex: number }): ReactElement {
    return (
        <ul className="footer__languageSelector">
            {
                languages.map((language, index) => {
                    let elementClassNames = ['footer__languageButton'];
                    if (index === props.selectedIndex) {
                        elementClassNames.push('footer__activeLanguage')
                    }
                    return (
                        <li key={index}>
                            <button type="button" className={elementClassNames.join(' ')}>{language}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}