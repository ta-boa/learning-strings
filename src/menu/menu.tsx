import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import Content from "./content";
import Settings from "./settings";
import { Scales, ScaleType } from '../music/scales';
import { Note } from "../music/types";
import { Signal, signal } from "@preact/signals";
import { getFriendlyNoteName } from "music/notes";

const stringifiedScales = Object.entries(Scales).map(([presetName, presetChords]) => {
    return Object.entries(presetChords).map(([chordName, chordNotes]) => {
        return { presetName, chordName, notes: chordNotes.sort().join("") }
    })
}).flat();

const FeatureMenu = ({ scale }) => {
    const { activeKeys, lang } = useContext(AppContext) as AppState;

    const updateScales = (event: Event) => {
        const newScale = (event.currentTarget as HTMLSelectElement).value;
        scale.value = Scales[newScale]
    }
    const allPressedNotes = Object.values(activeKeys.value).map((value) => {
        return value.note.map((note: Note) => {
            return note;
        })
    }).flat();

    let match: { presetName: string, chordName: string } | undefined = undefined;

    if (allPressedNotes.length) {
        const stringifiedNotes = allPressedNotes.sort().join("");
        Object.values(stringifiedScales).some(({ presetName, chordName, notes }) => {
            if (stringifiedNotes === notes) {
                match = { presetName, chordName }
                return true;
            }
        });
    }

    let barContent = "Try a chord"
    if (match) {
        barContent = `⚡${getFriendlyNoteName(match.chordName as Note, lang.value)} ${match.presetName}`;
    }
    return (<div>
        <div class="menu_bar_feature" data-target="initial">{barContent}</div>
        <div class="menu_bar_feature" data-target="content">
            <select id="select-chord-scale" onChange={updateScales}>
                {Object.keys(Scales).map((name: string, key: number) => {
                    return (
                        <option key={key} name={name} value={name}>{name}</option>
                    );
                })}
            </select>
        </div>
    </div>)
}

export default function Menu() {

    const { state } = useContext(AppContext) as AppState;

    const scale: Signal<ScaleType> = signal(Scales.Major);

    const toggleMenu = (value: "initial" | "content" | "settings") => () => {
        state.value = state.value === value ? "initial" : value;
    }
    return <div class="menu" data-state={state}>
        <div class="menu_bar">
            <button
                data-active={state.value === "settings"}
                class="menu_trigger"
                onClick={toggleMenu("settings")}>
                ⋮
            </button>
            <FeatureMenu scale={scale}></FeatureMenu>
            <button
                class="menu_trigger"
                data-active={state.value === "content"}
                onClick={toggleMenu("content")}>
                {state.value === "initial" ? "♪" : "▾"}
            </button>
        </div>
        {state.value !== "initial" && state.value === "settings" ?
            <Settings></Settings> :
            <Content scale={scale}></Content>}
    </div>

}