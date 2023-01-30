import { isMinor, isSharp, major, minor, sharp } from "./notes";
import { Note } from "./types";

const getLoopFromNote = (note: Note): Note[] => {
    const base: Note[] = ["C", "D", "E", "F", "G", "A", "B"];
    const index = base.indexOf(note);
    const left = base.splice(index);
    return left.concat(base);
}

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
}

const getNextHalfStep = (note: Note, list: Note[]) => {
    const index = list.indexOf(note);
    const baseNote = list[index];
    const targetNote = list[index + 1];
    if (baseNote.match(/^E|B$/)) {
        return major(targetNote);
    } else if (isSharp(baseNote)) {
        return major(targetNote);
    } else if (isMinor(baseNote)) {
        return major(targetNote);
    }
    return minor(targetNote);
}

const getMajorScaleFromNote = (
    note: Note
): Note[] => {
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
                break
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

export const MajorScale = {
    F: getMajorScaleFromNote("F"),
    C: getMajorScaleFromNote("C"),
    G: getMajorScaleFromNote("G"),
    D: getMajorScaleFromNote("D"),
    A: getMajorScaleFromNote("A"),
    E: getMajorScaleFromNote("E"),
    B: getMajorScaleFromNote("B"),
}
