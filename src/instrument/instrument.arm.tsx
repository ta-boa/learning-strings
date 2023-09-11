import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState, AppContext, Semi } from "../app";
import { Note, NoteSettings, PressedKeys } from "../music/types";
import { getFriendlyNoteName, isMajor, isFlat, isSharp } from "../music/notes";

export type ArmStringProps = {
  position: number;
};

const pickNote = (notes: Note[], semi: Semi): Note => {
  if (notes.length === 1) {
    return notes[0];
  }
  return notes.find((note: Note) => {
    return (
      (semi === "sharp" && isSharp(note)) || (semi === "flat" && isFlat(note))
    );
  });
};

export const ArmString = ({ position }: ArmStringProps) => {
  const { instrument, activeKeys, notesGrid, display, lang, semi } = useContext(
    AppContext
  ) as AppState;

  const {
    major: displayMajor,
    semi: displaySemi,
    fret: displayFret,
  } = display.value;
  const lastPositionIndex = instrument.value.tuning.length;
  const stringNotesByPosition = notesGrid.value[position];

  const hasBullet = (fretNum: number): boolean => {
    return fretNum in instrument.value.armBullets || fretNum === 0;
  };

  const togglePressed = (target: NoteSettings) => {
    return () => {
      const aKeys = { ...activeKeys.value } as PressedKeys;
      const current: null | NoteSettings = aKeys[position];
      if (
        current &&
        current.note === target.note &&
        current.fret == target.fret
      ) {
        delete aKeys[position];
      } else {
        aKeys[position] = target;
      }
      activeKeys.value = aKeys;
    };
  };

  const isNotePressed = (note: NoteSettings) => {
    const keys = activeKeys.value as PressedKeys;
    const current: NoteSettings = keys[position];
    if (!current) return false;
    return current.note === note.note && current.fret === note.fret;
  };

  const isStringPressed = (position: number) => {
    return position.toString() in activeKeys.value;
  };

  return (
    <div
      class="arm_string"
      data-position={position}
      data-is-pressed={isStringPressed(position)}
      data-last-string={position === lastPositionIndex}
    >
      <span
        aria-hidden="true"
        class="arm_string_cord"
        data-string={position + 1}
      ></span>

      {stringNotesByPosition.map((current: NoteSettings, key: number) => {
        const note = pickNote(current.note, semi.value);
        const noteName = getFriendlyNoteName(note, lang.value);
        if (
          position === 4 &&
          instrument.value.name === "Banjo" &&
          current.fret >= instrument.value.frets - 5
        ) {
          return;
        }
        let fretValue: number | string = current.fret;
        const isBullet = hasBullet(current.fret);
        if (position === 0) {
          if (current.fret === 0) {
            fretValue = "open";
          } else if (displayFret) {
            fretValue = current.fret;
          } else {
            fretValue = isBullet
              ? instrument.value.armBullets[current.fret]
              : "";
          }
        }
        const noteFret = position === 0 && (
          <span aria-hidden="true" data-bullet={isBullet} class="note_fret">
            {fretValue}
          </span>
        );

        let hidden = false;
        if (isSharp(note) || isFlat(note)) {
          hidden = displaySemi === false && current.fret !== 0;
        } else if (isMajor(note)) {
          hidden = displayMajor === false && current.fret !== 0;
        }

        return (
          <button
            key={key}
            class="note"
            onClick={togglePressed(current)}
            data-fret={current.fret}
            data-hidden={hidden}
            data-position={position}
            data-note={current.note}
            aria-pressed={isNotePressed(current)}
            title={note}
            aria-label={"string " + (position + 1) + " note " + noteName}
          >
            {noteFret}
            <span class="note_label">{noteName}</span>
          </button>
        );
      })}
    </div>
  );
};
