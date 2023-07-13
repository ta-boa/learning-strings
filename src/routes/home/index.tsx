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

interface View {
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
    lang: "doremi"
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
  return (
    <AppContext.Provider value={state}>
      <main
        class="app_main"
      //data-view={stringifyViews}
      //data-active-notes={stringifyActiveKeys}
      >
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