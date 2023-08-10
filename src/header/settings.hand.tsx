import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState, ArmDirection } from "../app";
export default function Hand() {
    const { dir } = useContext(AppContext) as AppState;
    const updateDirection = (event: Event) => {
        const newValue = (event.target as HTMLSelectElement).value as ArmDirection;
        dir.value = newValue;
    }
    return (
        <div class="menu_field">
            <label for="note-lang" class="menu_field_legend">Direction</label>
            <select id="note-lang" name="note-lang" onChange={updateDirection}>
                <option selected value="left">Left handed</option>
                <option value="right">Right handed</option>
            </select>
        </div>
    )
}