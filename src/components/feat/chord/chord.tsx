import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { signal } from "@preact/signals";
import { AppState } from "routes/home";
import AllScales from "../../../music/scales";
import { Note, NoteSettings } from "../../../music/types";
import { AppContext } from "../../app";
import { getFriendlyNoteName } from "../../../music/notes";
import style from "./style.scss";

function ChordItem({ name, notes }) {
  const { activeKeys } = useContext(AppContext) as AppState;
  const isPressed = (note: Note): boolean => {
    let result = false;
    Object.values(activeKeys.value).some((value: NoteSettings) => {
      if (Array.isArray(value.note)) {
        result = value.note.includes(note);
      } else {
        result = value.note == note;
      }
      return result;
    });
    return result;
  };
  return (
    <div class={style.chord}>
      <span class={style["chord-root-note"]}>{name}</span>
      <div class={style["chord-list"]}>
        {notes.map((note: Note, key: number) => {
          return (
            <span
              key={key}
              data-note={note}
              data-pressed={isPressed(note)}
              class={style["chord-list-note"]}
            >
              //getFriendlySemiNote(note)
            </span>
          );
        })}
      </div>
    </div>
  );
}

const scale = signal(AllScales.Major);

const Scales = () => {
  const updateScales = (event: Event) => {
    const newScale = (event.currentTarget as HTMLSelectElement).value;
    scale.value = AllScales[newScale];
  };
  return (
    <select onChange={updateScales}>
      {Object.keys(AllScales).map((name: string, key: number) => {
        return (
          <option key={key} name={name} value={name}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export default function Chords() {
  return (
    <Fragment>
      <summary class={style.trigger}>Chords</summary>
      <div class={style.content}>
        <Scales />
        <div>
          {Object.keys(scale.value)
            .sort()
            .map((name, key) => {
              return (
                <ChordItem key={key} name={name} notes={scale.value[name]} />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}
