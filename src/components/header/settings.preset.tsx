import { AppContext, AppState } from "app";
import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
export default function Preset() {
    const { tuning, instrument } = useContext(
        AppContext
    ) as AppState;

    const tuningOptions = instrument.value.tuningOptions;

    const tuningName = Object.keys(tuningOptions)
        .filter((name) => {
            return tuningOptions[name] === tuning.value;
        })
        .pop();

    const updatePreset = (event: Event) => {
        const select = event.target as HTMLSelectElement;
        const selectedOption = select.options[select.selectedIndex].value;
        tuning.value = [...instrument.value.tuningOptions[selectedOption]];
    }

    return (<fieldset>
        <legend>Preset</legend>
        <div>
            <select onChange={updatePreset} name="tunning-preset">
                {Object.keys(tuningOptions).map((preset, index) => {
                    return <option name="preset" selected={preset == tuningName} value={preset}>{preset}</option>
                })}
            </select>
        </div>
    </fieldset >)
}