import { ReactElement, useState } from "react";

interface ISearchForm {
    onSubmit: (value: string) => void;
}

export function SearchForm(props: ISearchForm): ReactElement {
    const [value, setValue] = useState('');

    const onValueChanged = (event: any) => {
        setValue(event.target.value);

    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (value.length > 0) {
            props.onSubmit(value);
        }
    }

    return (
        <form className="search__form" onSubmit={handleSubmit} >
            <input id="search_input" type="search" className="search__input" onChange={onValueChanged} placeholder="Search for music..." />
            <button id="search_button" type="submit" className="search__submit"></button>
        </form>
    );
}