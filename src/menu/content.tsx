import { getFriendlyNoteName } from "music/notes";
import { Note } from "music/types";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";

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
    <div className="content_chord_item">
      <strong className="content_chord_note" data-match={match}>
        {getFriendlyNoteName(name, lang.value)}
      </strong>
      {notes.map((note: Note) => {
        const noteName = getFriendlyNoteName(note, lang.value);
        return (
          <div
            className="content_chord_note"
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

export default function Content({ scale }) {
  const notesInside = scale.value.G.length;
  console.log("list chords", scale.value)

  return (
    <div className="content_chord_wrapper" data-notes={notesInside}>
      {Object.entries(scale.value).map(([name, value], key) => {
        return <ChordItem key={key} name={name} notes={value} />;
      })}
    </div>
  );
}
