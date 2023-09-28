import {
  isFlat,
  isSharp,
  major,
  minor,
  sharp,
  getNoteFromFret,
  getSemiToneFromType,
} from "./notes";
import { Note } from "./types";

const getLoopFromNote = (note: Note): Note[] => {
  const base: Note[] = ["A", "B", "C", "D", "E", "F", "G"];
  const index = base.indexOf(note);
  const left = base.splice(index);
  return left.concat(base);
};

const getNextWholeStep = (note: Note, list: Note[]) => {
  const index = list.indexOf(note);
  const baseNote = list[index];
  const targetNote = list[index + 1];
  if (baseNote.match(/^E|B$/)) {
    return sharp(targetNote);
  } else if (isSharp(baseNote)) {
    return sharp(targetNote);
  }
  return targetNote;
};

const getNextHalfStep = (note: Note, list: Note[]) => {
  const index = list.indexOf(note);
  const baseNote = list[index];
  const targetNote = list[index + 1];
  if (baseNote.match(/^E|B$/)) {
    return major(targetNote);
  } else if (isSharp(baseNote)) {
    return major(targetNote);
  } else if (isFlat(baseNote)) {
    return major(targetNote);
  }
  return minor(targetNote);
};

const echo = (note: Note) => note;

const getMajorScaleFromNote = (note: Note): Note[] => {
  let index = 0;
  const list = getLoopFromNote(note);
  const result: Note[] = [];
  while (index < 7) {
    switch (index) {
      case 0: // root note
        result.push(list[0]);
        break;
      case 1: // get whole step from 1
        result.push(getNextWholeStep(list[0], list));
        break;
      case 2: // get whole step from 2
        result.push(getNextWholeStep(list[1], list));
        break;
      case 3: // get half step from 3
        result.push(getNextHalfStep(list[2], list));
        break;
      case 4: // get whole step from 4
        result.push(getNextWholeStep(list[3], list));
        break;
      case 5: // get whole step from 5
        result.push(getNextWholeStep(list[4], list));
        break;
      case 6: // get whole step from 6
        result.push(getNextWholeStep(list[5], list));
        break;
    }
    list[index] = result[index];
    index++;
  }
  return result;
};

const pick = (range: number[], list: Note[]) => {
  return list.filter((_, index) => {
    return range.includes(index);
  });
};

const toBemol = (note: Note) => {
  const setting = getNoteFromFret(note, 11);
  return getSemiToneFromType(setting.note, "flat");
};

const toSharp = (note: Note) => {
  const setting = getNoteFromFret(note, 13);
  return getSemiToneFromType(setting.note, "sharp");
};

type Mutation = (note: Note) => Note;

const transformNotes = (notes: Note[], mutations: Mutation[]) => {
  if (mutations.length === 0) return notes;
  if (notes.length != mutations.length) {
    throw Error("notes and mutations should have same length");
  }
  return notes.map((note: Note, index: number) => {
    const fn = mutations[index];
    return fn(note);
  });
};

export const MajorScaleProgression = {
  C: getMajorScaleFromNote("C"),
  D: getMajorScaleFromNote("D"),
  E: getMajorScaleFromNote("E"),
  F: getMajorScaleFromNote("F"),
  G: getMajorScaleFromNote("G"),
  A: getMajorScaleFromNote("A"),
  B: getMajorScaleFromNote("B"),
};

export type ScaleType = Partial<{ [key: string]: Note[] }>;
export type ScalesType = Partial<{ [key: string]: ScaleType }>;

const buildScale = (
  selection: number[],
  mutations: Mutation[] = []
): ScaleType => {
  return Object.keys(MajorScaleProgression).reduce((newScale, note: Note) => {
    const notes = MajorScaleProgression[note];
    const notesInScale = pick(selection, notes);
    console.log(note, notesInScale, notes);
    const transformedNotes = transformNotes(notesInScale, mutations);
    newScale[note] = transformedNotes;
    return newScale;
  }, {});
};

// @todo- use b and s for notes to avoid ugly code
export const ScaleReference = {
  Major: ["1", "3", "5"],
  Minor: ["1", "3b", "5"],
  Diminished: ["1", "3b", "5b"],
  Augmented: ["1", "3", "5s"],
  "Major 7": ["1", "3", "5", "7b"],
  "Minor 7": ["1", "3b", "5", "7b"],
  "Dominant 7": ["1", "3", "5", "7s"],
  "Augmented 7": ["1", "3", "5s", "7b"],
};

export const Scales: ScalesType = Object.entries(ScaleReference).reduce(
  (newScale, [name, formula]) => {
    const indexList = [];
    const modiferList = [];
    formula.map((value: Note) => {
      indexList.push(parseInt(value) - 1);
      modiferList.push(
        isFlat(value) ? toBemol : isSharp(value) ? toSharp : echo
      );
    });
    // Ex os call: buildScale([0, 2, 4], [echo, minor, echo]),
    console.log("Build scale", name, indexList);
    const notesInScale = buildScale(indexList, modiferList);
    newScale[name] = notesInScale;
    return newScale;
  },
  {}
);

// export const Scales: ScalesType = {
//   Major: {
//     ...buildScale([0, 2, 4]),
//   },
//   Minor: {
//     ...buildScale([0, 2, 4], [echo, minor, echo]),
//   },
//   Diminished: {
//     ...buildScale([0, 2, 4], [echo, minor, minor]),
//   },
//   Augmented: {
//     ...buildScale([0, 2, 4], [echo, echo, sharp]),
//   },
//   "Major 7": {
//     ...buildScale([0, 2, 4, 6]),
//   },
//   "Minor 7": {
//     ...buildScale([0, 2, 4, 6], [echo, minor, echo, minor]),
//   },
//   "Dominant 7": {
//     ...buildScale([0, 2, 4, 6], [echo, echo, echo, minor]),
//   },
//   "Augmented 7": {
//     ...buildScale([0, 2, 4, 6], [echo, echo, sharp, minor]),
//   },
// };
