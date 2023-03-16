/* eslint-disable prettier/prettier */
import { AppContext } from "../../app";
import { Note, NoteSettings, Progression } from "../../../music/types";
import { getFriendlySemiNote, getNoteFromFret } from "../../../music/notes";
import { useContext } from "preact/hooks";
import { AppState } from "../../../routes/home";
import { h } from "preact";
import style from "./style.scss";

type Mode = "off" | "single" | "grid";

export default function ScaleProgression() {
  const { tuning, instrument, progression, notesGrid } = useContext(
    AppContext
  ) as AppState;

  let selectedNote: Note = tuning.value[0];
  let selectedPosition = 0;
  let selectedFret = 0;
  let mode: Mode = "off";

  const resolve = () => {
    if (mode === "off") {
      progression.value = [];
      return;
    }
    const linearNotes: NoteSettings[] = [
      getNoteFromFret(selectedNote, selectedFret),
      getNoteFromFret(selectedNote, selectedFret + 2), // whole
      getNoteFromFret(selectedNote, selectedFret + 4), // whole
      getNoteFromFret(selectedNote, selectedFret + 5), // half
      getNoteFromFret(selectedNote, selectedFret + 7), // whole
      getNoteFromFret(selectedNote, selectedFret + 9), // whole
      getNoteFromFret(selectedNote, selectedFret + 11), // whole
      getNoteFromFret(selectedNote, selectedFret + 12), // half
    ];
    if (mode === "grid") {
      const notesToSearch = linearNotes.map((target: NoteSettings) => {
        return target.note;
      });

      const progressionGrid = notesToSearch.map(
        (targetNote: Note | Note[], index: number) => {
          if (index === 0) return [];
          return notesGrid.value.map((stringNotes: NoteSettings[]) => {
            return stringNotes.filter((fretNote: NoteSettings) => {
              if (fretNote.fret < selectedFret) return false;
              if (Array.isArray(fretNote.note) && Array.isArray(targetNote)) {
                return (
                  targetNote.includes(fretNote.note[0]) ||
                  targetNote.includes(fretNote.note[1])
                );
              }
              return fretNote.note === targetNote;
            });
          });
        }
      );

      // resolve best sequence
      const result = {};
      const rootNote = linearNotes[0];

      progressionGrid.forEach(
        (matchList: NoteSettings[][], position: number) => {
          const progressionStep = position.toString();
          if (position === 0) {
            result[progressionStep] = {
              fret: rootNote.fret,
              position: selectedPosition,
              note: rootNote.note,
            };
            return;
          }
          let closestNote: Progression;
          matchList.forEach((notesToCheck: NoteSettings[], matchPosition) => {
            notesToCheck.forEach((value: NoteSettings) => {
              if (!closestNote) {
                closestNote = {
                  note: value.note,
                  fret: value.fret,
                  position: matchPosition,
                } as Progression;
                return;
              }

              const closestDist = closestNote.fret - rootNote.fret;
              const newDist = value.fret - rootNote.fret;
              const isLeadingString = selectedPosition === matchPosition;

              if (
                newDist < closestDist ||
                (newDist === closestDist && isLeadingString)
              ) {
                closestNote = {
                  note: value.note,
                  position: matchPosition,
                  fret: value.fret,
                } as Progression;
              }
            });
            result[progressionStep] = closestNote;
          });
        }
      );
      progression.value = Object.values(result);
    } else {
      // Linear progression
      progression.value = linearNotes.map((settings: NoteSettings) => {
        return {
          position: selectedPosition,
          fret: settings.fret,
        } as Progression;
      });
    }
  };

  const setString = (event: Event) => {
    const { value, selectedIndex } = event.currentTarget as HTMLSelectElement;
    selectedPosition = selectedIndex;
    selectedNote = value as Note;
    resolve();
  };
  const setFret = (event: Event) => {
    const { value } = event.currentTarget as HTMLSelectElement;
    selectedFret = parseInt(value, 10);
    resolve();
  };
  const setMode = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    mode = value as Mode;
    resolve();
  };

  return (
    <>
      <summary class={style.trigger}>Progression</summary>
      <div class={style.content}>
        <fieldset onInput={setMode}>
          <label>
            <input type="radio" name="type" value="off" checked />
            off
          </label>
          <label>
            <input type="radio" name="type" value="linear" />
            single
          </label>
          <label>
            <input type="radio" name="type" value="grid" />
            multi
          </label>
        </fieldset>
        <fieldset>
          <select id="string" name="string" onChange={setString}>
            {tuning.value.map((note: Note, index: number) => {
              return (
                <option value={note} key={`s-${index}`}>
                  ({index + 1}) {getFriendlySemiNote(note)}
                </option>
              );
            })}
          </select>
          <select id="fret" name="fret" onChange={setFret}>
            <option name="open" value="0">
              Open
            </option>
            {[...Array(instrument.value.frets - 1)].map((_, index: number) => {
              return (
                <option value={index + 1} key={`f-${index}`}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </fieldset>
      </div>
    </>
  );
}
