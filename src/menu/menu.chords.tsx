import { getFriendlyNoteName } from "music/notes";
import { Note } from "../music/types";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import { useSignal } from "@preact/signals";
import { Scales } from "../music/scales";

function ChordItem({ name, notes }) {
  const { lang, activeKeys, chordMatch } = useContext(AppContext) as AppState;

  const pressedKeys = Object.keys(activeKeys.value)
    .map((key) => {
      return activeKeys.value[key].note;
    })
    .flat()
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    
  const match = chordMatch.value?.chordName === name;
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


export default function Chords() {
  const scale = useSignal(Scales.Major)
  const notesInside = scale.value.G.length;
  console.log("list chords", scale.value);

  return (
    <div className="menu_chords" data-notes={notesInside}>
      {Object.entries(scale.value).map(([name, value], key) => {
        return <ChordItem key={key} name={name} notes={value} />;
      })}
    </div>
  );
}
