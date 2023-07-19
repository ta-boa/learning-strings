import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "../app";
import { Note, NoteSettings, PressedKeys, Progression } from "music/types";
import { getFriendlyNoteName, isMajor, isMinor, isSharp } from "music/notes";
import { AppContext } from "app";

export type ArmStringProps = {
  position: number;
};

export const Arm = ({ position }: ArmStringProps) => {
  const { instrument, activeKeys, progression, notesGrid, settings, lang } = useContext(
    AppContext
  ) as AppState;

  const last = instrument.value.strings - 1;
  const notes = notesGrid.value[position];

  const pickNote = (notes: Note[]): Note => {
    if (notes.length === 1) {
      return notes[0];
    }

    const { major, minor, sharp } = settings.value;

    const result = notes.reduce((acc: Note, n: Note): Note => {
      if (!!acc) return acc;
      if (isMajor(n) && major) {
        acc = n;
      } else if (isSharp(n) && sharp) {
        acc = n;
      } else if (isMinor(n) && minor) {
        acc = n;
      }
      return acc;
    }, null);
    return result
  }

  const hasBullet = (fret: number): boolean => {
    return fret in instrument.value.armBullets || fret === 0;
  };

  //const isPressed = (note: NoteSettings) => {
  //  const keys = activeKeys.value as PressedKeys;
  //  const current: NoteSettings | undefined = keys[position];
  //  if (current === undefined) return false;
  //  return current.note === note.note && current.fret === note.fret;
  //};

  //const getProgressionStep = (note: NoteSettings): number | null => {
  //  let step: number = -1;
  //  progression.value.some((prog: Progression, index) => {
  //    const match = prog.position === position && note.fret === prog.fret;
  //    if (match) step = index;
  //    return match;
  //  });
  //  if (step === -1) return null;
  //  return step + 1;
  //};

  //const togglePressed = (target: NoteSettings) => {
  //  return () => {
  //    const aKeys = { ...activeKeys.value } as PressedKeys;
  //    const current: null | NoteSettings = aKeys[position];
  //    if (
  //      current &&
  //      current.note === target.note &&
  //      current.fret == target.fret
  //    ) {
  //      delete aKeys[position];
  //    } else {
  //      aKeys[position] = target;
  //    }
  //    activeKeys.value = aKeys;
  //  };
  //}
  return (
    <div class="arm_string" data-position={position} data-last-string={position === last}>
      {notes.map((current: NoteSettings, key: number) => {
        const fret = current.fret === 0 ? "open" : current.fret;
        const note = pickNote(current.note);
        const noteName = getFriendlyNoteName(note, lang.value);
        return (
          <button
            key={key}
            class="note"
            data-fret={fret}
            data-major={isMajor(note)}
            data-minor={isMinor(note)}
            data-sharp={isSharp(note)}
            data-position={position}
            data-note={current.note}
          >
            {position === 0 && <span data-bullet={hasBullet(current.fret)} class="note_fret">{fret}</span>}
            <span class="note_label">{noteName}</span>
          </button>
        );
      })}
    </div>
  );
};
