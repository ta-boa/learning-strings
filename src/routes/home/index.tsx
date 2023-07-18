import { computed, Signal, signal } from "@preact/signals";
import { h } from "preact";
import {
  InstrumentSettings,
  Note,
  NoteSettings,
  PressedKeys,
  Progression,
} from "src/music/types";
import { AppContext } from "../../components/app";
import Instrument from "../../components/instrument/instrument";
import Instruments from "../../settings/index";

//import Display from "../../components/feat/display/display";
//import Tuning from "../../components/feat/tuning/tuning";
//import Chords from "../../components/feat/chord/chord";
//import ChordProgression from "../../components/feat/progression/progression";
import { getNoteFromFret, NoteLang } from "../../music/notes";

export interface View {
  major: boolean,
  sharp: boolean,
  minor: boolean,
  fret: boolean,
  lang: NoteLang
}

export type AppState = {
  activeKeys: Signal<Record<string, NoteSettings>>;
  instrument: Signal<InstrumentSettings>;
  tuning: Signal<Note[]>;
  view: Signal<View>;
  progression: Signal<Progression[]>;
  notesGrid: Signal<NoteSettings[][]>;
};

function createAppState(iSettings: InstrumentSettings): AppState {

  const instrument = signal(iSettings);
  const tuning = signal(iSettings.tuning);
  const activeKeys = signal({} as PressedKeys);
  const progression = signal([]);

  const view = signal({
    major: true,
    sharp: true,
    minor: false,
    fret: true,
    lang: "abc"
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
    instrument,
    tuning,
    activeKeys,
    view,
    progression,
    notesGrid,
  } as AppState;
}

interface Props {
  instrument?: string;
}

const Home = ({ instrument }: Props) => {
  const state = createAppState(Instruments[instrument] || Instruments.banjo);
  //const stringifyViews = computed(() => {
  //  if (state?.view?.value) {
  //    return Object.keys(state.view.value)
  //      .filter((val: string) => {
  //        return state.view.value[val];
  //      })
  //      .join(",");
  //  }
  //  return "";
  //});
  //const stringifyActiveKeys = computed(() => {
  //  return Object.values(state.activeKeys.value).map((data) => data.note);
  //});
  //data-view={stringifyViews}
  //data-active-notes={stringifyActiveKeys}
  return (
    <AppContext.Provider value={state}>
      <header class="header">
        <menu class="menu">
          <details class="menu_item">
            <summary class="menu_label">Settings</summary>
            <div class="menu_content">
              <fieldset>
                <legend>Notes as</legend>
                <div>
                  <label>
                    <input checked type='radio' name="note-name" />
                    <span>A</span>
                  </label>
                  <label>
                    <input type='radio' name="note-name" />
                    <span>Do</span>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Tunning</legend>
                <div>
                  <select>
                    <option>G</option>
                    <option>G</option>
                    <option>G</option>
                    <option>G</option>
                  </select>
                  <select>
                    <option>D</option>
                    <option>D</option>
                    <option>D</option>
                  </select>
                  <select>
                    <option>G</option>
                  </select>
                  <select>
                    <option>B</option>
                  </select>
                  <select>
                    <option>D</option>
                  </select>
                </div>
              </fieldset>
            </div>
          </details>
        </menu>
      </header>
      <main class="app_main" >
        <section class="app_content">
          <Instrument />
        </section>
      </main>
    </AppContext.Provider>
  );
};
export default Home;
/**
 <menu class={style.menu}>
  <Display />
  <Tuning />
  <Chords />
  <ChordProgression />
</menu>
 */