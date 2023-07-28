import { AppContext, AppState } from "../app";
import { h } from "preact";
import { useContext } from "preact/hooks";

export default function Display() {
    const { settings } = useContext(
        AppContext
    ) as AppState;

    const updateSettings = (event: Event) => {
        const newValue = { ...settings.value };
        const prop = (event.currentTarget as HTMLInputElement).name;
        const value = (event.currentTarget as HTMLInputElement).checked;
        if (!(prop in newValue)) {
            throw new Error("Invalid checkbox prop:" + prop);
        }
        newValue[prop] = value;
        settings.value = newValue;
    }

    return (<fieldset>
        <legend>Display</legend>
        <div>
            <div class="checkbox_field">
                <input id="frets" type="checkbox" onInput={updateSettings} checked={settings.value.fret} name="fret" />
                <label for="frets">
                    Frets
                </label>
            </div>
            <div class="checkbox_field">
                <input id="semi" type="checkbox" onInput={updateSettings} checked={settings.value.semi} name="semi" />
                <label for="semi">
                    Semiton
                </label>
            </div>
            <div class="checkbox_field">
                <input id="major" type="checkbox" onInput={updateSettings} checked={settings.value.major} name="major" />
                <label for="major">
                    Major
                </label>
            </div>
        </div>
    </fieldset >)
}