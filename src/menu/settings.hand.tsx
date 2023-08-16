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
            <label for="leading-hand" class="menu_field_legend">Chord hand</label>
            <select id="leading-hand" name="note-lang" onChange={updateDirection}>
                <option selected value="left">Left</option>
                <option value="right">Right</option>
            </select>
        </div>
    )
}