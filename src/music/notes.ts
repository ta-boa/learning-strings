import { Note, NoteSettings } from "./types";

export const major = (note: Note): Note => note.charAt(0) as Note;
export const minor = (note: Note): Note => `${note.charAt(0)}b` as Note;
export const sharp = (note: Note): Note => `${note.charAt(0)}s` as Note;
export const isSharp = (note: Note) => !!note.match(/s$/);
export const isMinor = (note: Note) => !!note.match(/b$/);
export const isMajor = (note: Note) => !isSharp(note) && !isMinor(note);

export const FretSequence: Record<string, Note | Note[]> = {
  C: ["Cs", "Db"],
  Cs: "D",
  Db: "D",
  D: ["Ds", "Eb"],
  Ds: "E",
  Eb: "E",
  E: "F",
  F: ["Fs", "Gb"],
  Fs: "G",
  Gb: "G",
  G: ["Gs", "Ab"],
  Gs: "A",
  Ab: "A",
  A: ["As", "Bb"],
  As: "B",
  Bb: "B",
  B: "C",
};

export const getFriendlySemiNote = (note: Note) => {
  return note.replace(/s$/, "♯").replace(/b$/, "♭");
};

export const getNoteFromFret = (note: Note, fret: number): NoteSettings => {
  let lastNote: Note = note;
  let count = fret;
  while (fret > 0 && count--) {
    lastNote = FretSequence[lastNote] as Note;
    if (Array.isArray(lastNote) && count > 0) {
      lastNote = lastNote[0];
    }
  }
  return { note: lastNote, fret } as NoteSettings;
};
