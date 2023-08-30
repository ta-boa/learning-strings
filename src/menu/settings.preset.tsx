import { FretSequence, getFriendlyNoteName } from "music/notes";
import { Note } from "music/types";
import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
export default function Preset() {
  const { tuning, instrument, lang } = useContext(AppContext) as AppState;

  const updateTunning = (index: number) => (event: Event) => {
    const newValue: Note = (event.target as HTMLSelectElement).value as Note;
    const newTuning = [...tuning.value];
    newTuning[index] = newValue;
    tuning.value = newTuning;
  };

  const getNotesSequence = (target: Note, position: number) => {
    return Object.keys(FretSequence).map((note: string, key: number) => {
      return (
        <option key={key} value={note} selected={note === target}>
          {getFriendlyNoteName(note as Note, lang.value)}
        </option>
      );
    });
  };

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
  };

  return (
    <Fragment>
      <div class="menu_field">
        <label for="preset" class="menu_field_legend">
          Tunning preset:
        </label>
        <select id="preset" onChange={updatePreset} name="tunning-preset">
          {Object.keys(tuningOptions).map((preset, index) => {
            return (
              <option
                name="preset"
                selected={preset == tuningName}
                value={preset}
              >
                {preset}
              </option>
            );
          })}
        </select>
      </div>
      <div class="menu_field">
        <span class="menu_field_legend">String tunning:</span>
        <div class="menu_string_tuning_wrapper">
          {tuning.value.map((value: Note, index: number) => {
            const id = `tune-string-${index + 1}`;
            return (
              <div class="menu_string_tuning">
                <label
                  class="menu_string_tuning_label"
                  for={id}
                  aria-label={`Tune the string ${index + 1}`}
                >
                  {index + 1}
                </label>
                <select
                  id={id}
                  onChange={updateTunning(index)}
                  name={`tune-string-${index + 1}`}
                >
                  {getNotesSequence(value, index + 1)}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
