import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "routes/home";
import { Note, NoteSettings, PressedKeys, Progression } from "music/types";
import { getFriendlySemiNote, isMinor, isSharp } from "music/notes";
import { AppContext } from "app";
import style from "./style.scss";

export type ArmStringProps = {
  position: number;
};

export const ArmString = ({ position }: ArmStringProps) => {
  const { instrument, activeKeys, progression, notesGrid } = useContext(
    AppContext
  ) as AppState;
  const armBullets = instrument.value.armBullets;
  const last = instrument.value.strings - 1;
  const bulletList = Object.keys(armBullets) as string[];
  const notes = notesGrid.value[position];

  const hasBullet = (fret: number): string | undefined => {
    return bulletList.includes(fret.toString())
  };

  const isPressed = (note: NoteSettings) => {
    const keys = activeKeys.value as PressedKeys;
    const current: NoteSettings | undefined = keys[position];
    if (current === undefined) return false;
    return current.note === note.note && current.fret === note.fret;
  };

  const getProgressionStep = (note: NoteSettings): number | null => {
    let step: number = -1;
    progression.value.some((prog: Progression, index) => {
      const match = prog.position === position && note.fret === prog.fret;
      if (match) step = index;
      return match;
    });
    if (step === -1) return null;
    return step + 1;
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

  return (
    <div class={style.string} data-position={position} data-last-string={position === last}>
      {notes.map((current: NoteSettings, key: number) => {
        const fret = current.fret === 0 ? "open" : current.fret;
        const n = current.note[0];
        //if (Array.isArray(n) && n.length === 2) {
        //  const [first, last] = n;
        //  body = (
        //    "foo"
        //    // <div class={style.semi}>
        //    //   <span data-sharp={isSharp(first)} data-minor={isMinor(first)}>
        //    //     {getFriendlySemiNote(first)}
        //    //   </span>
        //    //   <span data-sharp={isSharp(last)} data-minor={isMinor(last)}>
        //    //     {getFriendlySemiNote(last)}
        //    //   </span>
        //    // </div>
        //  );
        //} else {
        //  body = (
        //    "bar"
        //    //<span class={style.full} data-major="true">
        //    //  {getFriendlySemiNote(current.note as Note)}
        //    //</span>
        //  );
        //}
        return (
          <button
            key={key}
            class={style.note}
            onClick={togglePressed(current)}
          //aria-pressed={isPressed(current)}
          //data-progression-step={getProgressionStep(current)}
          //data-fret={fret}
          //data-position={position}
          //data-note={current.note}
          //data-bullet={getArmBullet(current.fret)}
          >
            <span class={style.note_label}>{n}</span>
            <span class={style.string_cord}></span>
            {position === 0 && <span data-bullet={hasBullet(current.fret)} class={style.note_fret}>{fret}</span>}
          </button>
        );
      })}
    </div>
  );
};
