import { AppContext, AppState } from "app";
import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
export default function SettingsTunning() {
    const { tuning, instrument } = useContext(
        AppContext
    ) as AppState;
    
    const tuningOptions = instrument.value.tuningOptions;

    const tuningName = Object.keys(tuningOptions)
        .filter((name) => {
            return tuningOptions[name] === tuning.value;
        })
        .pop();

    return (
        <Fragment>
            <fieldset>
                <legend>Preset</legend>
                <div>
                    <select name="tunning-preset">
                        {Object.keys(tuningOptions).map((preset, index) => {
                            return <option name="preset" selected={preset == tuningName} value={index}>{preset}</option>
                        })}
                    </select>
                </div>
            </fieldset>
        </Fragment>)
}