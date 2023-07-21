import { AppContext, AppState } from "app";
import { NoteLang } from "music/notes";
import { h } from "preact"
import { useContext } from "preact/hooks";
export default function Lang() {
    const { lang } = useContext(AppContext) as AppState;
    const updateLang = (event: Event) => {
        const select = event.target as HTMLSelectElement;
        lang.value = select.value as NoteLang;
    }
    return (
        <fieldset>
            <legend>Notes as</legend>
            <div>
                <select id="note-lang" name="note-lang" onChange={updateLang}>
                    <option value="abc">C D E</option>
                    <option value="doremi">Do Re Mi</option>
                </select>
            </div>
        </fieldset >
    )
}