import { createContext, h } from "preact";
import { Route, Router } from "preact-router";
import Home from "./home";
import {
  InstrumentSettings,
  Note,
  NoteSettings,
  PressedKeys,
  Progression,
} from "music/types";
import { NoteLang, getNoteFromFret, isSharp } from "./music/notes";
import { Signal, computed, signal } from "@preact/signals";
import { Scales } from "./music/scales";

export const AppContext = createContext(null);

export interface Settings {
  major: boolean;
  semi: boolean;
  fret: boolean;
}

export type ArmDirection = "left" | "right";
export type State = "initial" | "settings" | "content";
export type ChordMath = { presetName: string, chordName: Note } | undefined

export type AppState = {
  lang: Signal<NoteLang>;
  dir: Signal<ArmDirection>;
  state: Signal<State>;
  activeKeys: Signal<Record<string, NoteSettings>>;
  instrument: Signal<InstrumentSettings>;
  tuning: Signal<Note[]>;
  settings: Signal<Settings>;
  progression: Signal<Progression[]>;
  notesGrid: Signal<NoteSettings[][]>;
  chordMatch: Signal<ChordMath>;
};

const stringifiedScales = Object.entries(Scales).map(([presetName, presetChords]) => {
  return Object.entries(presetChords).map(([chordName, chordNotes]) => {
    return { presetName, chordName: chordName as Note, notes: chordNotes.sort().join("") }
  })
}).flat();

const allScales = Object.values(stringifiedScales)
function createCombinations(keys: Array<Note[]>) {
  var result = []
  var current = []
  var index = 0
  function recurse() {
    if (index === keys.length) {
      result.push(current.slice())
      return
    }
    for (var i = 0; i < keys[index].length; i++) {
      current.push(keys[index][i])
      index++
      recurse()
      index--
      current.pop()
    }
  }
  recurse()
  return result;
}
export function createAppState(iSettings: InstrumentSettings): AppState {
  const instrument = signal(iSettings);
  const tuning = signal(iSettings.tuning);
  const activeKeys = signal({} as PressedKeys);
  const progression = signal([]);
  const lang = signal("abc");
  const dir = signal("left");
  const state = signal("initial");

  const view = signal({
    major: true,
    semi: true,
    fret: true,
  });

  const notesGrid = computed(() => {
    return tuning.value.map((rootNote: Note) => {
      const armNotes: NoteSettings[] = [];
      for (let fret = 0; fret < instrument.value.frets; fret++) {
        armNotes.push(getNoteFromFret(rootNote, fret));
      }
      return armNotes;
    });
  });


  const chordMatch = computed((): ChordMath => {
    const notes = Object.values(activeKeys.value).map((n: NoteSettings) => {
      return n.note;
    })



    if (notes.length === 0) {
      return;
    }
    const uniqueNotes = createCombinations(notes)
      .map((noteList: []) => {
        return noteList.filter((value, index, self) => {
          return self.indexOf(value) === index
        })
      })
      .map(list => list.sort().join(""))


    return allScales.find(({ presetName, chordName, notes }) => {
      return uniqueNotes.reduce((result: ChordMath, seq: string) => {
        if (result) {
          return result;
        }
        if (seq === notes) {
          return (result = { presetName, chordName: chordName })
        }
        return result;
      }, null);
    });
  });

  return {
    state,
    lang,
    dir,
    instrument,
    tuning,
    activeKeys,
    settings: view,
    progression,
    notesGrid,
    chordMatch
  } as AppState;
}

const App = () => (
  <Router>
    <Route path="/:instrument?" component={Home} />
  </Router>
);

export default App;
