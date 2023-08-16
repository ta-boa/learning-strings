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
import { NoteLang, getNoteFromFret } from "music/notes";
import { Signal, computed, signal } from "@preact/signals";

export const AppContext = createContext(null);

export interface Settings {
  major: boolean;
  semi: boolean;
  fret: boolean;
}

export type ArmDirection = "left" | "right";
export type State = "initial" | "settings" | "content";

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
};

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
  } as AppState;
}

const App = () => (
  <Router>
    <Route path="/:instrument?" component={Home} />
  </Router>
);

export default App;
