import { computed, Signal, signal } from "@preact/signals";
import { h } from "preact";
import {
  InstrumentSettings,
  Note,
  NoteSettings,
  PressedKeys,
  Progression,
} from "src/music/types";
import { AppContext } from "app";
import Instrument from "components/instrument/instrument";
import Instruments from "settings";
import style from "./style.scss";
import Display from "feat/display/display";
import Tuning from "feat/tuning/tuning";
import Chords from "feat/chord/chord";
import MenuItem from "feat/menu/menu";
import ChordProgression from "feat/progression/progression";
import { getNoteFromFret } from "music/notes";

export type AppState = {
  activeKeys: Signal<Record<string, NoteSettings>>;
  instrument: Signal<InstrumentSettings>;
  tuning: Signal<Note[]>;
  views: Signal<Record<string, boolean>>;
  progression: Signal<Progression[]>;
  notesGrid: Signal<NoteSettings[][]>;
};

function createAppState(iSettings: InstrumentSettings): AppState {
  const instrument = signal(iSettings);
  const tuning = signal(iSettings.tuning);
  const activeKeys = signal({} as PressedKeys);
  const progression = signal([]);
  const views = signal({
    major: true,
    sharp: true,
    minor: false,
    fret: true,
  });
  const notesGrid = computed(() => {
    return tuning.value.map((rootNote: Note) => {
      const armNotes = [];
      for (let fret = 0; fret < instrument.value.frets; fret++) {
        armNotes.push(getNoteFromFret(rootNote, fret));
      }
      return armNotes as NoteSettings[];
    });
  });

  return {
    instrument,
    tuning,
    activeKeys,
    views,
    progression,
    notesGrid,
  } as AppState;
}

interface Props {
  instrument?: string;
}

const Home = ({ instrument }: Props) => {
  const state = createAppState(Instruments[instrument] || Instruments.banjo);
  const stringfyViews = computed(() => {
    if (state?.views?.value) {
      return Object.keys(state.views.value)
        .filter((val: string) => {
          return state.views.value[val];
        })
        .join(",");
    }
    return "";
  });
  const stringifyActiveKeys = computed(() => {
    return Object.values(state.activeKeys.value).map((data) => data.note);
  });
  return (
    <AppContext.Provider value={state}>
      <main
        class={style.main}
        data-view={stringfyViews}
        data-active-notes={stringifyActiveKeys}
      >
        <menu class={style.menu}>
          <MenuItem>
            <Display />
          </MenuItem>
          <MenuItem>
            <Tuning />
          </MenuItem>
          <MenuItem>
            <Chords />
          </MenuItem>
          <MenuItem>
            <ChordProgression />
          </MenuItem>
        </menu>
        <section class={style.content}>
          <Instrument />
        </section>
      </main>
    </AppContext.Provider>
  );
};
export default Home;
