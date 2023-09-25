import { computed, useSignal } from "@preact/signals";
import { getFriendlyNoteName } from "music/notes";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import { Scales, ScaleReference } from "../music/scales";
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
          >
            {noteName}
          </div>
        );
      })}
    </div>
  );
}

export default function MenuProgression() {
  const { menu, tilt } = useContext(AppContext) as AppState;
  if (menu.value === "progression") {
    tilt.value = 2;
  }

  return (
    <div aria-hidden={menu.value !== "progression"} class="menu_progression">
      progression
    </div>
  );
}
