import { AppContext, AppState } from "../app";
import { NoteLang } from "music/notes";
import { h } from "preact";
import { useContext } from "preact/hooks";
export default function Lang() {
  const { lang } = useContext(AppContext) as AppState;
  const updateLang = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    lang.value = select.value as NoteLang;
  };
  return (
    <div class="menu_field">
      <label for="note-lang" class="menu_field_legend">
        Show notes as:
      </label>
      <select id="note-lang" name="note-lang" onChange={updateLang}>
        <option value="abc">C, D, E</option>
        <option value="doremi">Do, Re, Mi</option>
      </select>
    </div>
  );
}
