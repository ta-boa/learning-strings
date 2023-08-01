import { createContext, h } from "preact";
import { Route, Router } from "preact-router";
import Home from "./home";
import { InstrumentSettings, Note, NoteSettings, PressedKeys, Progression } from "music/types";
import { NoteLang, getNoteFromFret } from "music/notes";
import { Signal, computed, signal } from "@preact/signals";

export const AppContext = createContext(null);

export interface Settings {
  major: boolean,
  semi: boolean,
  fret: boolean,
}

export type AppState = {
  lang: Signal<NoteLang>,
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
    lang,
    instrument,
    tuning,
    activeKeys,
    settings: view,
    progression,
    notesGrid,
  } as AppState;
}


const App = () => (
  <div>
    <Router>
      <Route path="/:instrument?" component={Home} />
    </Router>
  </div>
);

export default App;
