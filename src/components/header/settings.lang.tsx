import { AppContext, AppState } from "app";
import { NoteLang } from "music/notes";
import { h } from "preact"
import { useContext } from "preact/hooks";
export default function SettingsLang() {
    const { lang } = useContext(AppContext) as AppState;
    const updateLang = (event: Event) => {
        const select = event.target as HTMLSelectElement;
        lang.value = select.value as NoteLang;
    }
    return (
        <fieldset>
            <legend for="note-lang">Notes as</legend>
            <div>
                <select id="note-lang" name="note-lang" onChange={updateLang}>
                    <option value="abc">A B C</option>
                    <option value="doremi">Do Re Mi</option>
                </select>
            </div>
        </fieldset >
    )
}