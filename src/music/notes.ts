import { Note, NoteSettings } from "./types";

export const major = (note: Note): Note => note.charAt(0) as Note;
export const minor = (note: Note): Note => `${note.charAt(0)}b` as Note;
export const sharp = (note: Note): Note => `${note.charAt(0)}s` as Note;
export const isSharp = (note: Note) => !!note.match(/s$/);
export const isFlat = (note: Note) => !!note.match(/b$/);
export const isMajor = (note: Note) => !isSharp(note) && !isFlat(note);

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

export const NoteName = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "So",
  A: "La",
  B: "Si",
};

export type NoteLang = "abc" | "doremi";

export const getFriendlyNoteName = (note: Note, lang: NoteLang): string => {
  if (typeof note !== "string") {
    throw new Error("Not string");
  }
  let friendlyNote = note.toString();
  if (lang === "doremi") {
    friendlyNote = friendlyNote.replace(
      /^[A-Z]/,
      NoteName[friendlyNote.charAt(0)]
    );
  }
  return friendlyNote.replace(/s$/, "♯").replace(/b$/, "♭");
};

export const getNoteFromFret = (note: Note, fret: number): NoteSettings => {
  let lastNote: Note = note;
  let count = fret;
  let nextNote: Note | Note[];
  while (fret > 0 && count--) {
    nextNote = FretSequence[lastNote];
    if (Array.isArray(nextNote) && count > 0) {
      lastNote = nextNote[0];
    } else {
      lastNote = nextNote as Note;
    }
  }
  nextNote = Array.isArray(lastNote) ? lastNote : [lastNote];
  return { note: nextNote, fret } as NoteSettings;
};
