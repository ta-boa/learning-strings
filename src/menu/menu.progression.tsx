import { useSignal } from "@preact/signals";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import {
  getFriendlyNoteName,
  getNoteFromFret,
  getSemiToneFromType,
} from "../music/notes";
import { Note, NoteSettings, Progression } from "../music/types";

const getSingleStringProgression = (
  selectedNote: Note,
  selectedFret: number
) => {
  return [
    getNoteFromFret(selectedNote, selectedFret),
    getNoteFromFret(selectedNote, selectedFret + 2), // whole
    getNoteFromFret(selectedNote, selectedFret + 4), // whole
    getNoteFromFret(selectedNote, selectedFret + 5), // half
    getNoteFromFret(selectedNote, selectedFret + 7), // whole
    getNoteFromFret(selectedNote, selectedFret + 9), // whole
    getNoteFromFret(selectedNote, selectedFret + 11), // whole
    getNoteFromFret(selectedNote, selectedFret + 12), // half
  ] as NoteSettings[];
};

export default function MenuProgression() {
  const { menu, tilt, activeKeys, semi, lang, progression, notesGrid } =
    useContext(AppContext) as AppState;

  const linear = useSignal([]);

  if (menu.value === "progression") {
    tilt.value = 4;
  }

  const entries = Object.entries(activeKeys.value);
  if (entries.length === 1) {
    const [position, noteSetting] = entries[0];
    const currentSetting: NoteSettings = noteSetting;
    const note = getSemiToneFromType(currentSetting.note, semi.value);
    linear.value = getSingleStringProgression(note, currentSetting.fret).map(
      (setting: NoteSettings): Progression => {
        const { fret, note } = setting;
        return {
          fret,
          note,
          position: parseInt(position),
        } as Progression;
      }
    );
  }

  return (
    <div aria-hidden={menu.value !== "progression"} class="menu_progression">
      <table cellSpacing={2}>
        <thead>
          <tr>
            <td></td>
            <td>root</td>
            <td>whole</td>
            <td>whole</td>
            <td>half</td>
            <td>whole</td>
            <td>whole</td>
            <td>whole</td>
            <td>half</td>
          </tr>
        </thead>
        <tr>
          <td>single</td>
          {linear.value.map((item: Progression) => {
            return (
              <td>
                {item.position}:{item.fret} -{" "}
                {getFriendlyNoteName(
                  getSemiToneFromType(item.note, semi.value),
                  lang.value
                )}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>multi</td>
        </tr>
      </table>
    </div>
  );
}
