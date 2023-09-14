import { useSignal } from "@preact/signals";
import { getFriendlyNoteName } from "music/notes";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import { Scales } from "../music/scales";
import { Note } from "../music/types";

function ChordItem({ name, notes, presetName }) {
  const { lang, activeKeys, chordMatch } = useContext(AppContext) as AppState;

  const pressedKeys = Object.keys(activeKeys.value)
    .map((key) => {
      return activeKeys.value[key].note;
    })
    .flat()
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  let match = false;
  if (presetName.value && presetName.value === chordMatch.value?.presetName) {
    match = chordMatch.value?.chordName === name;
  }

  return (
    <div className="menu_chord_item">
      <strong className="menu_chord_item_lead" data-match={match}>
        {getFriendlyNoteName(name, lang.value)}
      </strong>
      {notes.map((note: Note) => {
        const noteName = getFriendlyNoteName(note, lang.value);
        return (
          <div
            className="menu_chord_item_note"
            data-pressed={pressedKeys.includes(note)}
            data-match={match}
            data-note={note}
            arial-label={noteName}
          >
            {noteName}
          </div>
        );
      })}
    </div>
  );
}

export default function MenuChords() {
  const { menu, tilt } = useContext(AppContext) as AppState;

  const presetName = useSignal("Major");
  const scale = useSignal(Scales[presetName.value]);

  if (menu.value === "chords") {
    tilt.value = scale.value.G.length + 3;
  }

  const updateScales = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    if (select.value in Scales) {
      scale.value = Scales[selectedValue];
      presetName.value = selectedValue;
    }
  };

  return (
    <div class="menu_chords">
      <select onChange={updateScales}>
        {Object.keys(Scales).map((name: string, key: number) => {
          return (
            <option key={key} name={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>
      <div className="menu_chords_grid">
        {Object.entries(scale.value).map(([name, value], key) => {
          return (
            <ChordItem
              key={key}
              name={name}
              notes={value}
              presetName={presetName}
            />
          );
        })}
      </div>
    </div>
  );
}
