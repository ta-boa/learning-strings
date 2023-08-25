import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState, AppContext } from "../app";
import { Note, NoteSettings, PressedKeys, Progression } from "music/types";
import { getFriendlyNoteName, isMajor, isMinor, isSharp } from "music/notes";

export type ArmStringProps = {
  position: number;
};

export const ArmString = ({ position }: ArmStringProps) => {
  const { instrument, activeKeys, notesGrid, settings, lang } = useContext(
    AppContext
  ) as AppState;

  const last = instrument.value.tuning.length;
  const notes = notesGrid.value[position];
  const display = settings.value;
  const { major, semi } = settings.value;

  const pickNote = (notes: Note[]): Note => {
    if (notes.length === 1) {
      return notes[0];
    }

    const result = notes.reduce((result: Note, n: Note): Note => {
      if (!!result) return result;
      if (isMajor(n) && major) {
        result = n;
      } else if (isSharp(n)) {
        result = n;
      } else if (isMinor(n)) {
        result = n;
      }
      return result;
    }, null);
    return result
  }

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
  }

  const isNotePressed = (note: NoteSettings) => {
    const keys = activeKeys.value as PressedKeys;
    const current: NoteSettings | undefined = keys[position];
    if (current === undefined) return false;
    return current.note === note.note && current.fret === note.fret;
  };

  const isStringPressed = (position: number) => {
    return position.toString() in activeKeys.value
  }

  return (
    <div
      class="arm_string"
      data-position={position}
      data-is-pressed={isStringPressed(position)}
      data-last-string={position === last}>

      <span
        aria-hidden="true"
        class="arm_string_cord"
        data-string={position + 1}></span>

      {notes.map((current: NoteSettings, key: number) => {
        const note = pickNote(current.note);
        const noteName = getFriendlyNoteName(note, lang.value);
        if (position === 4 && instrument.value.name === "Banjo" && current.fret >= instrument.value.frets - 5) {
          return;
        }
        let fretValue: number | string = current.fret;
        const isBullet = hasBullet(current.fret);
        if (position === 0) {
          if (current.fret === 0) {
            fretValue = "open";
          } else if (display.fret) {
            fretValue = current.fret;
          } else {
            fretValue = isBullet ? instrument.value.armBullets[current.fret] : "";
          }
        }
        const noteFret = position === 0 && (<span aria-hidden="true" data-bullet={isBullet} class="note_fret">{fretValue}</span>)

        let hidden = false;
        if (isSharp(note) || isMinor(note)) {
          hidden = semi === false && current.fret !== 0;
        } else if (isMajor(note)) {
          hidden = major === false && current.fret !== 0;
        }

        return (

          <button
            key={key}
            class="note"
            onClick={togglePressed(current)}
            data-fret={current.fret}
            data-major={isMajor(note)}
            data-minor={isMinor(note)}
            data-sharp={isSharp(note)}
            data-semi={isSharp(note) || isMinor(note)}
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