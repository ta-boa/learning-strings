import { h, Fragment } from "preact";
import { AppContext } from "../../app";
import { useContext } from "preact/hooks";
import { AppState } from "routes/home";
import { Note } from "music/types";
import { FretSequence, getFriendlyNoteName } from "music/notes";
import style from "./style.scss";

export default function Tuning() {
  const { tuning, instrument, progression, activeKeys } = useContext(
    AppContext
  ) as AppState;
  const tuningOptions = instrument.value.tuningOptions;
  const tuningName = Object.keys(tuningOptions)
    .filter((name) => {
      return tuningOptions[name] === tuning.value;
    })
    .pop();

  const resetOtherFeatures = () => {
    progression.value = [];
    activeKeys.value = {};
  };

  const updateStringTuning = (position: number) => (event: Event) => {
    const newTuning = (event.target as HTMLOptionElement).value as Note;
    const newList = [...tuning.value];
    newList[position] = newTuning;
    resetOtherFeatures();
    tuning.value = newList;
  };
  const updateTuning = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const newTuning = tuningOptions[select.value];
    if (Array.isArray(newTuning)) {
      resetOtherFeatures();
      tuning.value = newTuning;
    }
  };
  const getList = (target: string, position: number) => {
    return (
      <select
        name={`string ${position + 1}`}
        class={style["string-list"]}
        onChange={updateStringTuning(position)}
      >
        {Object.keys(FretSequence).map((note: string, key: number) => {
          return (
            <option key={key} value={note} selected={note === target}>
              {
              "getFriendlySemiNote(note as Note)"
              }
            </option>
          );
        })}
      </select>
    );
  };

  const getTuningList = () => {
    return (
      <select
        class={style["tuning-options"]}
        name="tuning-options"
        onChange={updateTuning}
      >
        <option>Select an option</option>
        {Object.keys(tuningOptions).map((name: string, key: number) => {
          return (
            <option selected={tuningName === name} value={name} key={key}>
              {name}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <Fragment>
      <summary class={style.trigger}>Tuning</summary>
      <div class={style.content}>
        {getTuningList()}
        <div class={style.current}>{tuning.value.map(getList)}</div>
      </div>
    </Fragment>
  );
}
