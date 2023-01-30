import { computed, Signal, signal } from '@preact/signals';
import { h } from "preact";
import { InstrumentSettings, Note, NoteSettings, PressedKeys } from 'src/music/types';
import { AppContext } from '../../components/app';
import Instrument from '../../components/instrument/instrument';
import Instruments from "../../settings/index";
import style from './style.scss';
import Display from '../../components/feat/display/display';
import Tuning from '../../components/feat/tuning/tuning';
import Chords from '../../components/feat/chord/chord';

export type AppState = {
    activeKeys: Signal<Record<string, NoteSettings>>;
    instrument: Signal<InstrumentSettings>;
    tuning: Signal<Note[]>;
    views: Signal<Record<string, boolean>>;
};

function createAppState(iSettings: InstrumentSettings): AppState {
    const instrument = signal(iSettings);
    const tuning = signal(iSettings.tuning);
    const activeKeys = signal({} as PressedKeys);
    const views = signal({
        major: true,
        sharp: true,
        minor: false,
        fret: true,
    });
    return { instrument, tuning, activeKeys, views } as AppState;
}

interface Props {
    instrument?: string;
}

const Home = ({ instrument }: Props) => {
    const state = createAppState(Instruments[instrument] || Instruments.banjo);
    const stringfyViews = computed(() => {
        if (state?.views?.value) {
            return Object.keys(state.views.value).filter((val: string) => {
                return state.views.value[val];
            }).join(",");
        }
        return ""
    })
    const stringifyActiveKeys = "Ttb"
    return (
        <AppContext.Provider value={state}>
            <main class={style.main} data-view={stringfyViews} data-active-notes={stringifyActiveKeys}>
                <menu class={style.menu}>
                    <header class={style.header}>
                        <h1>🎵Learning Strings</h1>
                    </header>
                    <Display />
                    <Tuning />
                    <Chords />
                </menu>
                <section class={style.content}>
                    <Instrument />
                </section>
            </main>
        </AppContext.Provider>
    );
};
export default Home;
